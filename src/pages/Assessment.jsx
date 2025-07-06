import React, { useState } from 'react';
import './Assessment.css'; // 👈 Import file CSS vào đây

export default function Assessment() {
  const [formData, setFormData] = useState({
    class_level: '',
    subject: '',
    study_time: '',
    goal: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/generate-learning-path/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Lộ trình học tập đã tạo:', data);
      alert('🎉 Lộ trình học tập đã tạo thành công!');
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  return (
    <div className="assessment-container">
      <h2 className="assessment-title">📝 Đánh giá trình độ học tập</h2>

      <form className="assessment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Bạn đang học lớp mấy?</label>
          <select
            name="class_level"
            value={formData.class_level}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">-- Chọn lớp --</option>
            <option value="10">Lớp 10</option>
            <option value="11">Lớp 11</option>
            <option value="12">Lớp 12</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Bạn muốn cải thiện môn học nào?</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-input"
            placeholder="Ví dụ: Toán, Vật lý..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Thời gian học mỗi ngày?</label>
          <select
            name="study_time"
            value={formData.study_time}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">-- Chọn thời gian --</option>
            <option value="1 giờ">1 giờ</option>
            <option value="2 giờ">2 giờ</option>
            <option value="3 giờ">3 giờ</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Mô tả mục tiêu học tập của bạn:</label>
          <textarea
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="form-input"
            rows="4"
            placeholder="Ví dụ: Thi đậu Đại học Bách khoa, nâng cao kỹ năng Toán..."
          />
        </div>

        <button type="submit" className="submit-btn">
          🚀 Gửi đánh giá & Tạo lộ trình
        </button>
      </form>
    </div>
  );
}
