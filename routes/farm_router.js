const express = require('express');
const router = express.Router();
const Farm = require('../models/farm');
const Product = require('../models/product');

router.get('/', async(req, res)=>{
    const farms = await Farm.find({});
    res.render('farms', {farms});
})

router.get('/new', async(req, res)=>{
    res.render('new_farms');
})

router.get('/:id', async(req, res)=>{
    // products is the name of the field in model
    const farm = await Farm.findById(req.params.id).populate('products');
    console.log(farm);
    res.render('farm_single', {farm});
})

router.get('/:id/products/new', async(req, res)=>{
    const { id } = req.params
    const farm = await Farm.findById(id);
    res.render('new_products', {farm});
})

router.post('/:id/products', async(req, res)=>{
    const {id} = req.params;
    const farm = await Farm.findById(id);
    const {name, price, category} = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product);
    // or
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${farm._id}`);
})

router.post('/', async(req, res)=>{
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
})

module.exports = router;