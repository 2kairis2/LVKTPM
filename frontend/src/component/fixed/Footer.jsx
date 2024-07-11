import "./Footer.css";
export default function Footer() {
  return (
    <div className="Footer">
      <div className="footer-contact">
        <img
          src={process.env.PUBLIC_URL + "/images/fixed/Frame 18.png"}
          className="img-footer"
        ></img>
        <button className="contact-button">XEM CỬA HÀNG CỦA CHÚNG TÔI</button>
      </div>
      <div className="footer-navigation">
        <div className="navigation-col col-1">
          <a>Liên hệ với chúng tôi</a>
        </div>
        <div className="navigation-col col-2">
          <a>Trung tâm hỗ trợ</a>
          <a>Hướng dẫn đặt hàng</a>
        </div>
        <div className="navigation-col col-3">
          <a>Chính sách bảo mật</a>
          <a>Điều khoản sử dụng</a>
          <a>Chính sách cookie</a>
        </div>
        <div className="navigation-col col-4">
          <a>Tìm cửa hàng</a>
        </div>
      </div>
    </div>
  );
}
