import React from 'react';
import './AccountOverview.css';

function AccountOverview() {
    const userData = localStorage.getItem('user');
    const                                           user = userData ? JSON.parse(userData) : {};
    const orders = user?.orders ?? [];
    // Danh sách các trường bạn muốn loại bỏ
    const excludedFields = ['password', '_id', 'isAdmin', '__v', 'orders']; // Thay thế bằng các trường thực tế bạn muốn loại bỏ

    // Hàm kiểm tra xem trường có nằm trong danh sách loại bỏ không
    const isExcludedField = (field) => excludedFields.includes(field);

    // Hàm để chuyển đổi giá trị status thành chuỗi trạng thái tương ứng
    const getStatusString = (status) => {
        switch (status) {
            case 1:
                return "Đã xác nhận";
            case 2:
                return "Đã giao hàng";
            case 3:
                return "Đã gửi hàng";
            default:
                return "Chưa được xác nhận";
        }
    };
    return (
        <div className='row'>
            <div className="column">
                <div className="text-b-md text-center">TỔNG QUAN</div>
                <div className='infor-list'>
                    {Object.keys(user).map((key, index) => (
                        // Kiểm tra nếu trường không nằm trong danh sách loại bỏ thì hiển thị
                        !isExcludedField(key) && (
                            <div key={index} className="row-list">
                                <span className="key">{key}:</span>
                                <span className="value">{key === 'birthday' ? (new Date(user[key]).toLocaleDateString()) : user[key]}</span>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <div className="column">
                <div className="text-b-md text-center">ĐƠN HÀNG</div>
                <div>
                    <ul style={{ listStyle: 'none' }}>

                        {orders.map((order, index) => (
                            <div key={index}>
                                <hr />
                                <li className="list-item">
                                    <div>
                                        <span><strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleDateString()}</span><br />
                                        <span><strong>Trạng thái:</strong> {getStatusString(order.status)}</span><br />
                                        <span><strong>Tổng số tiền:</strong> {Number(order.total).toFixed(3)} VND</span>
                                    </div>

                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AccountOverview;
