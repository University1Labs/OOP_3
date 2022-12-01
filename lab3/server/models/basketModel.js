const {Schema,model, SchemaType} = require("mongoose");

const Basket = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    devices:{type:Schema.Types.ObjectId,ref:"Device",required:true}
});

module.exports = model('Basket',Basket);