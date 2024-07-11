import "./Introduction.css";

export default function Introduction() {
    return (
        <div className='Introduction'>
            <div className='introduction-img'>
                Sản phẩm dinh dưỡng thủy canh
            </div>
            <div className='introduction-content'>
                <div className='content-title'>
                    <h2>
                    Tại nên chọn rau quả thủy canh với Hương Sen Farm
                    </h2>
                </div>
                <div className='content-text'>
                    <p>
                    Sử dụng rau quả thủy canh mang lại nhiều lợi ích cho sức khỏe và môi trường. Đầu tiên, phương pháp này giúp tăng cường sự tiện lợi và tiết kiệm không gian, cho phép người dùng trồng rau quả ngay tại nhà mình mà không cần đất trồng. Bằng cách này, người tiêu dùng có thể dễ dàng theo dõi quá trình phát triển của cây và thu hoạch sản phẩm tươi ngon mỗi ngày.
                    </p>
                    <p>
                    Hương Sen Farm luôn hỗ trợ bạn sử dụng rau quả sạch bằng công nghệ thủy canh hiện đại. Vừa tiện lợi, vừa an toàn cho sức khỏe của bạn
                    </p>
                </div>
                <div className='content-app'>
                    <div className="intro1">
                        <img className="img-intro1"  src={
                            process.env.PUBLIC_URL +
                            "/images/home/Group1.png" 
                        }alt="" ></img>
                        <div className="content-app-title1">
                            <p>Rau củ ngon sạch</p>
                        </div>
                    </div>
                    <div className="intro1">
                        <img className="img-intro1"  src={
                            process.env.PUBLIC_URL +
                            "/images/home/Group2.png" 
                        }alt="" ></img>
                        <div className="content-app-title1">
                            <p>Công nghệ hiện đại</p>
                        </div>
                    </div>
                    <div className="intro1">
                        <img className="img-intro3"  src={
                            process.env.PUBLIC_URL +
                            "/images/home/Group3.png" 
                        }alt="" ></img>
                        <div className="content-app-title1">
                            <p>An toàn sức khỏe</p>
                        </div>
                    </div>
                    <div className="intro1">
                        <img className="img-intro1"  src={
                            process.env.PUBLIC_URL +
                            "/images/home/Group4.png" 
                        }alt="" ></img>
                        <div className="content-app-title1">
                            <p>Lợi ích lâu dài</p>
                        </div>
                    </div>
                    {/* <img
                        src={
                            process.env.PUBLIC_URL +
                            "/images/home/intro_img.png"
                        }
                        className='intro-img'></img> */}
                </div>
            </div>
        </div>
    );
}
