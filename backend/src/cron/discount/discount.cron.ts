import cron from 'node-cron';
import discountService from '~/modules/discount/discount.service';
import productService from '~/modules/product/product.service';

// Chạy cron job 10 mỗi phút
cron.schedule('* * * * *', async () => {
    console.log('Kiểm tra mã giảm giá...');
    try {
        const discounts = await discountService.asyncDiscount();

        if (discounts.discountEarlyActive.length > 0) {
            console.log('Có mã giảm giá sắp kích hoạt...');
            console.log('Đang cập nhật giá sản phẩm...');
            await productService.asyncPriceProduct(discounts.discountEarlyActive, 'ACTIVE');
        }

        if (discounts.discountEarlyExpired.length > 0) {
            console.log('Có mã giảm giá sắp hết hạn...');
            console.log('Đang cập nhật giá sản phẩm...');
            await productService.asyncPriceProduct(discounts.discountEarlyActive, 'REMOVE');
        }

        console.log('Cập nhật mã giảm giá và giá sản phẩm thành công!');
    } catch (error) {
        console.error('Error running cron job:', error);
    }
});
