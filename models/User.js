const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
name: {
    type:String,
    required:true
},
lastName: {
    type:String,
    required:true
},
mobile: {
    type:Number,
    required:true
},
sex: {
    type:String,
    required:true
},
email: {
    type:String,
    required:true,
    unique:true,
},
password: {
    type:String,
    required:true
},
registerDate :{
    type:Date,
    default:Date.now
},
});
module.exports = User = mongoose.model('user',UserSchema);