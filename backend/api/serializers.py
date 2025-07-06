from rest_framework import serializers
from .models import ProgressLog

class ProgressLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgressLog
        fields = '__all__'
