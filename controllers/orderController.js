const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');


//@description       Fetch all orders
//@route             GET  /orders
//@access            Private/admin
const getPosts = asyncHandler(async(req,res)=>{
    const docs = await Order.find().select('product quantity _id productImage');
    
    res.status(200).json({
        count : docs.length,
        orders : docs.map(doc=>{
            return{
                _id : doc._id,
                product : doc.product,
                quantity : doc.quantity,
                productImage : doc.productImage,
                request : {
                    type : 'GET',
                    url : 'http://localhost:3000/orders/' + doc._id
                }
            }
        })
    });
});


//@description       Create an order
//@route             POST  /orders
//@access            Public
const createPost = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.body.productId);
    if(!product){
        return res.status(404).json({
            message : 'Product not found'
            });
    }
    const order = new Order({
        _id : mongoose.Types.ObjectId(),
        quantity : req.body.quantity,
        product : req.body.productId
    });
    const result = await order.save();
    console.log(result);
    res.status(201).json({
        message : 'Order Stored',
        createdOrder : {
            _id : result._id,
            product : result.product,
            quantity : result.quantity
        },
        request : {
            type : 'GET',
            url : 'http://localhost:3000/orders/'+result._id 
        }
    });
});


//@description        Fetch single order
//@route              Get  /orders/:id
//@access             Public
const getPostById = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.orderId);
    if(!order){
        return res.status(404).json({
            message : 'Order not found'
        });
    }
    
    res.status(200).json({
        request : {
        order : order,
        type : 'GET',
        url : 'http://localhost:3000/orders'
        }
    });
    
});


//@description        Delete a order
//@route              DELETE  /orders/:id
//@access             Public
const deletePost = asyncHandler(async(req,res)=>{
    const result = await Order.remove({_id : req.params.orderId});
    
    res.status(200).json({
        message : 'Order deleted',
        request : {
            type : 'POST',
            url : 'http://localhost:3000/orders',
            body : {productId : 'ID', Quantity : 'Number' }
        }
    });        
});

module.exports = {
    getPosts,
    createPost,
    getPostById,
    deletePost
};