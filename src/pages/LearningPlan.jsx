import React, { useEffect, useState } from 'react';
import './LearningPlan.css'; 

export default function LearningPlan() {
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/progress/')
      .then((res) => {
        if (!res.ok) throw new Error('Lỗi kết nối đến server');
        return res.json();
      })
      .then((data) => {
        setProgressList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Lỗi lấy tiến độ:', err);
        setError('Không thể tải tiến độ học tập.');
        setLoading(false);
      });
  }, []);

  const getCompletedCount = () =>
    progressList.filter((item) => item.status === 'done').length;

  const getProgressPercent = () => {
    if (progressList.length === 0) return 0;
    return Math.round((getCompletedCount() / progressList.length) * 100);
  };

  return (
    <div className="learning-plan-container">
      <h2 className="plan-title">📘 Lộ trình học tập của bạn</h2>

      {loading ? (
        <p>⏳ Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : progressList.length === 0 ? (
        <p>📭 Bạn chưa có lộ trình học nào. Hãy bắt đầu bằng việc tạo đánh giá!</p>
      ) : (
        <>
          {/* Progress bar */}
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${getProgressPercent()}%` }}
            ></div>
          </div>
          <p className="progress-text">Tiến độ hoàn thành: {getProgressPercent()}%</p>

          {/* Timeline */}
          <ul className="timeline">
            {progressList.map((item) => (
              <li key={item.id} className={`timeline-item ${item.status === 'done' ? 'completed' : ''}`}>
                <span className="week-label">📅 Tuần {item.week}</span>
                <p className="task-title">{item.task_title}</p>
                <span className={`status-tag ${item.status}`}>
                  {item.status === 'done' ? '✅ Hoàn thành' : '🕒 Chưa hoàn thành'}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
