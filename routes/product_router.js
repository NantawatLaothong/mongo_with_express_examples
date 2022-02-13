const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async(req, res)=>{
    const products = await Product.find({});
    res.render('products', {products});
})

router.get('/new', async(req, res)=>{
    res.render('new_products');
})

router.post('/', async(req, res)=>{
    const product = new Product(req.body);
    await product.save();
    res.redirect('/products');
})

module.exports = router;