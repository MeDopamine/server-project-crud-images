const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/controller.js");

router.get('/', ProductController.getTest);
router.get('/products', ProductController.getProducts);
router.post('/products', ProductController.saveProducts);
router.get('/products/:id', ProductController.getProductsById);
router.patch('/products/:id', ProductController.updateProducts);
router.delete('/products/:id', ProductController.deleteProducts);

module.exports = router;
