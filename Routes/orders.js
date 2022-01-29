const express = require('express');
const router = express.Router();

const { 
    getPosts,
    createPost,
    getPostById,
    deletePost
} = require('../controllers/orderController');

const { protect, admin } = require("../middlewares/authMiddleware");

//create an Order
router.post('/', createPost);
    
//show all the orders
router.get('/', protect, admin, getPosts);
   
//show specific order
router.get('/:orderId', getPostById);
   
//delete an order
router.delete('/:orderId', deletePost);
    

module.exports = router;