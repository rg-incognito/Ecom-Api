const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    address : {
      type : mongoose.Schema.Types.ObjectId,
      // ref : addressSchema
    },
    contactNumber : { type : Number, required : true, unique : true},
    profileImage: {
      type : String
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save', async function(next) {

if(!this.isModified('password')) {
  next()
}
 const salt = bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt)
})



module.exports = mongoose.model('User', userSchema);

