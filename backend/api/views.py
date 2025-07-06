from openai import OpenAI
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ProgressLog
from .serializers import ProgressLogSerializer
from django.contrib.auth.models import User
from deep_translator import GoogleTranslator

# 🔐 GPT Client (DeepInfra)
openai = OpenAI(
    api_key="rt4TcoQRkgGx6YAlEPArqiVKJd1lPAxx",  # ← Thay bằng DeepInfra API Key của bạn
    base_url="https://api.deepinfra.com/v1/openai"
)

@api_view(['POST'])
def generate_learning_path(request):
    data = request.data
    class_level = data.get('class_level')
    subject = data.get('subject')
    study_time = data.get('study_time')
    goal = data.get('goal')

    if not all([class_level, subject, study_time, goal]):
        return Response({'error': 'Thiếu thông tin bắt buộc.'}, status=status.HTTP_400_BAD_REQUEST)

    # 📦 Tạo prompt GPT
    messages = [
        {
            "role": "system",
            "content": "You are an academic advisor who creates personalized study plans."
        },
        {
            "role": "user",
            "content": f"""Create a 4-week personalized study plan for a grade {class_level} student who wants to improve in {subject}.
They can study {study_time} per day. Their goal is: {goal}.
Format the response as:
Week 1: ...
Week 2: ...
Week 3: ...
Week 4: ...
"""
        }
    ]

    # 🧠 Gọi GPT từ DeepInfra
    try:
        response = openai.chat.completions.create(
            model="meta-llama/Meta-Llama-3-8B-Instruct",
            messages=messages,
            stream=False
        )
    except Exception as e:
        return Response({'error': 'Lỗi khi gọi GPT', 'details': str(e)}, status=500)

    gpt_text_en = response.choices[0].message.content

    # 🔁 Dịch sang tiếng Việt
    try:
        gpt_text_vi = GoogleTranslator(source='auto', target='vi').translate(gpt_text_en)
    except Exception as e:
        gpt_text_vi = "⚠️ Không thể dịch. Vui lòng xem bản tiếng Anh."

    # 📘 Parse từng tuần
    plan = {}
    for line in gpt_text_vi.split('\n'):
        if line.strip().lower().startswith("tuần"):
            parts = line.split(":", 1)
            if len(parts) == 2:
                try:
                    week = int(parts[0].replace("Tuần", "").strip())
                    task = parts[1].strip()
                    plan[week] = task
                except:
                    continue

    # 👤 Gán user mặc định nếu chưa có đăng nhập
    user, _ = User.objects.get_or_create(username='default_user')

    # 🖨️ Log ra terminal
    print("👤 Gán user:", user)
    print("📘 Lưu từng tuần:", plan)

    # 💾 Lưu vào DB
    for week, task_title in plan.items():
        ProgressLog.objects.create(
            user=user,
            week=week,
            task_title=task_title,
            status='pending'
        )

    return Response({
        "message": "✅ Đã tạo lộ trình học!",
        "plan_vietnamese": plan,
        "raw_english_output": gpt_text_en
    })


@api_view(['GET'])
def get_progress_list(request):
    logs = ProgressLog.objects.all().order_by('week')
    serializer = ProgressLogSerializer(logs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def update_progress_status(request):
    log_id = request.data.get('id')
    new_status = request.data.get('status')

    try:
        log = ProgressLog.objects.get(id=log_id)
        log.status = new_status
        log.save()
        return Response({"message": "Cập nhật trạng thái thành công!"})
    except ProgressLog.DoesNotExist:
        return Response({"error": "Không tìm thấy bản ghi tiến độ"}, status=404)
