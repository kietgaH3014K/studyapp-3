import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // nhớ tạo file CSS riêng nhé

export default function Header() {
  return (
    <header>
      {/* Top Navbar */}
      <div className="top-navbar">
        <div className="logo">
          🎓 <span className="logo-bold">STUDYAPP</span>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/assessment" className="nav-link">Đánh giá</Link>
          <Link to="/learning-plan" className="nav-link">Lộ trình</Link>
          <Link to="/schedule" className="nav-link">Lịch học</Link>
        </nav>
      </div>

      {/* Big Banner */}
      <div className="banner">
        <div className="banner-content">
          <h1 className="banner-title">STUDYAPP</h1>
          <p className="banner-subtitle">🌟 Hỗ trợ bạn xây dựng lộ trình học tập cá nhân hóa 🌟</p>
        </div>
      </div>
    </header>
  );
}
