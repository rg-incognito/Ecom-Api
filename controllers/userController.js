const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const mongoose = require("mongoose");
const User = require("../models/user");
const Address = require("../models/address");



//@desc       Register a new User
//@route      POST /users
//@access     Public
const registerUser = asyncHandler( async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  const address_id = mongoose.Types.ObjectId();
  const { addressline1, addressline2, city, state, pincode, contactNumber } = req.body;

  const address = await Address.create({
    address_id,
    addressline1,
    addressline2,
    city,
    state,
    pincode
  });

  await address.save();

  const user = await User.create({
    name,
    email,
    password,
    address_id,
    contactNumber,
    profileImage
  });
  
  const result = await user.save();
  console.log(result);
  
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      address: user.address_id,
      contactNumber: user.contactNumber,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid User data" });
  }
});


//@desc       Auth user & get token
//@route      POST /users/login
//@access     Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).json({ message: "Invalid email or password" });
  }
});


//@desc       User Profile
//@route      GET /users/profile
//@access     Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      contactNumber: user.contactNumber,
      profileImage: user.profileImage
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// @desc      Get all users
// @route     GET /api/users
// @access    Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc      Delete user
// @route     DELETE /users/:id
// @access    Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc      Get user by ID
// @route     GET /users/:id
// @access    Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById
};
