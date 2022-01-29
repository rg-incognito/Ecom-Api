const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  _id : {type : mongoose.Schema.Types.ObjectId, ref : userSchema },
  addressline1: { type : String, required: true},
  addressline2: {type: String},
  city: {type : String, required : true},
  state: {type : String, required : true},
  pincode: {type : Number, required: true}
});

module.exports = mongoose.model('Address', addressSchema);