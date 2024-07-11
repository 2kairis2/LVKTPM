const BestSellerItem = ({ product }) => {
    return (
        <div className='BestSellerItem'>
            <div className='product-top'>
                <div className='product-image'>
                    <img src={"/"+product.ProductImage[0]}></img>
                </div>
                <div className='product-name'>{product.ProductName}</div>
                <div className='product-description'>
                    {product.ProductDescription}
                </div>
            </div>
            <div className='product-bot'>
                <div className='product-price'>{product.ProductPrice}</div>
            </div>
        </div>
    );
};

export default BestSellerItem;