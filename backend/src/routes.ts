import { Router } from 'express';

import authRoutes from '~/modules/auth/auth.routes';
import rolesRoutes from '~/modules/role/role.routes';
import userRoutes from '~/modules/user/user.routes';
import productRoutes from '~/modules/product/product.routes';
import productDetailRoutes from '~/modules/product-detail/product-detail.routes';
import supplierRoutes from '~/modules/supplier/supplier.routes';
import imageRoutes from '~/modules/image/image.routes';
import categoryRoutes from '~/modules/category/category.routes';
import typeRoutes from '~/modules/type/type.routes';
import inventoryReceiptRoutes from '~/modules/inventory-receipt/inventory-receipt.routes';
import cartRoutes from '~/modules/cart/cart.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/roles', rolesRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/product-details', productDetailRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/images', imageRoutes);
router.use('/categories', categoryRoutes);
router.use('/types', typeRoutes);
router.use('/inventory-receipts', inventoryReceiptRoutes);
router.use('/cart', cartRoutes);

router.get('/docs', (req, res) => {
    res.send('Docs');
});

export default router;
