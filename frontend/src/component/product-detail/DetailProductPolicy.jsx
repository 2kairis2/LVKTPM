import './DetailProductPolicy.css'

export default function DetailProductPolicy(){
    return(
        <div className="detail-product-policy-container">
            <div className="title">
                <h1>CHÍNH SÁCH ĐẶC BIỆT CỦA HUONG SEN FARM</h1>
            </div>
            <div className="container-image">
            <img
              src={process.env.PUBLIC_URL + "/images/product/Group 2163.png"} className="policy-img"
              alt=""
            />
            </div>
        </div>
    )
}