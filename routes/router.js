const express = require("express");
const router = express.Router();
const productRouter = require("./productRouter")

router.use('/api/v1', productRouter);

module.exports = router; 
