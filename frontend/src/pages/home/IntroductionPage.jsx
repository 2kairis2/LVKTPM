import React from "react";
import "./IntroductionPage.css"; // Import file CSS
import Header from "../../component/fixed/Header";
import Footer from "../../component/fixed/Footer";
function IntroductionPage() {
  return (
    <div className="IntroductionPage">
      <Header />
      <div className="introduction-page">
        <header className="header">
          <h1 className="header-title">Chào mừng đến với Hương Sen Farm</h1>
        </header>
        <section className="section">
          <h2 className="section-title">Về Chúng Tôi</h2>
          <p className="section-content">
            Hương Sen Farm là điểm đến duy nhất của bạn cho mọi nhu cầu nông
            nghiệp. Chúng tôi cung cấp một loạt các công cụ nông nghiệp, hạt
            giống, phân bón và nhiều hơn nữa.
          </p>
        </section>
        <section className="section">
          <h2 className="section-title">Sản Phẩm Của Chúng Tôi</h2>
          <ul className="product-list">
            <li>Công Cụ Nông Nghiệp</li>
            <li>Hạt Giống</li>
            <li>Phân Bón</li>
            {/* Thêm các sản phẩm khác ở đây */}
          </ul>
        </section>
        <section className="section">
          <h2 className="section-title">Liên Hệ Với Chúng Tôi</h2>
          <p className="section-content">
            Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào, hãy liên hệ với chúng
            tôi qua:
          </p>
          <p className="section-content">Email: example@example.com</p>
          <p className="section-content">Điện thoại: 123-456-7890</p>
          {/* Thêm thông tin liên hệ khác nếu cần thiết */}
        </section>
        <footer className="footer">
          <p className="footer-text">
            &copy; 2024 Hương Sen Farm. Bảo lưu mọi quyền.
          </p>
        </footer>
      </div>
      <Footer />
    </div>
  );
}

export default IntroductionPage;
