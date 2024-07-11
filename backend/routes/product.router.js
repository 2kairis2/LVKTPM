const router = require("express").Router();
const controller = require("../controllers/product.controller");
const upload = require("../middlewares/multer");
router.get('/products/search', controller.searchProduct);
router.get("/products", controller.getProducts);
router.get("/products/:id", controller.getProduct);
router.get("/productsa", controller.getProductsa);
router.get("/productsa/:id", controller.getProducta);

router.post("/products", upload.single("image"), controller.createProduct);
router.put("/products/:id", upload.single("image"), controller.updateProduct);
router.delete("/products/:id", controller.deleteProduct);

// router.patch(

//   upload.array("images", 10),
//   productController.create
// );
module.exports = router;
