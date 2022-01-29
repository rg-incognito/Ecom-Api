const express = require('express');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,'./uploads/');
  },
  filename : function(req,file,cb){
    cb(null, new Date().toISOString() + file.originalname);
  }
});


const fileFilter = (req, file, cb) => {
  //reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
};


//const upload = multer({dest: 'uploads/'});
const upload = multer({
  storage : storage, 
  limits : {
  filesize : 1024*1024*5
  },
  fileFilter : fileFilter
});

const{
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
} = require("../controllers/productController");

const { protect, admin } = require("../middlewares/authMiddleware");

//Save Products into database
router.post('/', protect, admin , upload.single('productImage'), createPost);
 
//Get Products from database
router.get('/', getPosts);
 
//Update Products
router.patch('/:productId', protect, admin,updatePost);
   
//Get specific product from database
router.get('/:productId', getPostById);

// Delete a specific product
router.delete("/:productId", protect , admin,deletePost);

module.exports = router;