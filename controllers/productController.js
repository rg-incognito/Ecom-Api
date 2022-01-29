const Posts = require("../models/product");
const mongoose = require('mongoose');
const asyncHandler = require("express-async-handler");


//@description           Fetch all products
//@route                 GET /products
//@access                Public 
const getPosts = asyncHandler(async (req, res) => {
    const products = await Posts.find();
    res.json(products);
});


//@description            Add new product
//@route                  POST  /products
//@access                 Private/admin
const createPost = asyncHandler(async (req, res) => {
    const product = await new Posts({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
        // productImage = req.file.path
    });
  
    const savedProduct = await product.save();
    res.json(savedProduct);
});


//@description            Fetch single product
//@route                  GET  /products/:id
//@access                 Public
const getPostById = asyncHandler(async (req, res) => {
    const specificProduct = await Posts.findById(req.params.productId);
    res.json(specificProduct);
});


//@description            Edit the price of a product 
//@route                  PATCH  /products/:id
//@access                 Private/admin
const updatePost = asyncHandler(async (req, res) => {
    const updatedProduct = await Posts.updateOne({_id : req.params.productId}, {$set : {price : req.body.price}});
    res.json(updatedProduct);
});


//@description            Delete a product
//@route                  DELETE  /products/:id
//@access                 Private/admin
const deletePost = asyncHandler(async (req, res) => {
    const deletedProduct = await Posts.deleteOne({ _id: req.params.productId });
    res.json(deletedProduct);
});
  
module.exports = {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
};