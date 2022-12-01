const {Schema,model} = require("mongoose");

const Device = new Schema({
    name:{type:String,required:true},
    price:{type:String,required:true},
    img:{type:String},
    description:{type:String},
    brand:{type:String,ref:'Brand',required:true},
    type:{type:String,ref:'Type',required:true}
});

module.exports = model('Device',Device);