import React from 'react'
import './AccountHeader.css'
function AccountHeader() {
    return (
        <div className="header-account">
            <div className="img-head-container">
                <img src={process.env.PUBLIC_URL + '/images/account/flowerpot_7302490.png'} className='img-head' width={50} />
            </div>

            <p className="text-center">Chào mừng bạn đến với tài khoản của bạn </p>
            <p className="text-center">Bạn có thể quản lý trải nghiệm mua sắm của mình tại HƯƠNG SEN FARM </p>
        </div>
    )
}

export default AccountHeader