const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");

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

//register a new user
router.post("/", upload.single('profileImage'), registerUser);

//get all users
router.get("/", protect, admin, getUsers);

//Auth user & get token
router.post("/login", authUser);

//get User Profile
router.get("/profile", protect, getUserProfile);

//Get user by Id
router.get('/:id',protect,admin,getUserById)

//Delete a user
router.delete("/:id",protect,admin,deleteUser)

module.exports = router;
