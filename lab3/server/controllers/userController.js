const deviceModel = require("./../models/deviceModel");
const basketModel = require("./../models/basketModel");
const brandModel = require("./../models/brandModel");
const typeModel = require("./../models/typeModel");

class userController{
    async getDevices(req,res){
        try{ 
            const devices = await deviceModel.find();
            res.json(devices);
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }
    }
    async getBrands(req,res){
        try{
            const brands = await brandModel.find();
            return res.json(brands);
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }
    }
    async getTypes(req,res){
        try{
            const types = await typeModel.find();
            return res.json(types);
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }
    }
    async filterBrands(req,res){
        try{
            const filter_name = req.body.name;
            const devices = await deviceModel.find({brand:filter_name});
            return res.json(devices);
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }
    }
    async filterTypes(req,res){
        try{
            const filter_name = req.body.name;
            const devices = await deviceModel.find({type:filter_name});
            return res.json(devices);
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }
    }
    async filterBrands_Types(req,res){
        try{
            const filter_brand = req.body.brand.name;
            const filter_type = req.body.type.name;
            const devices = await deviceModel.find({type:filter_type,brand:filter_brand});
            return res.json(devices);
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }
    }
    async updateBasket(req,res){
        try{
            const userId = req.user.id;
            const device = req.body.id;
            const Basket = new basketModel({userId,devices:device});
            await Basket.save();
            return res.json({message:"Has been added"});
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }
    }
    async getBasket(req,res){
        try{
            const userId = req.user.id;
            const userBasket = await basketModel.find({userId});
            return res.json(userBasket);
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }
    }
    async getDevice(req,res){
        try{
            const id = req.body.id.id;
            const deviceInfo = await deviceModel.findById(id);
            return res.json({deviceInfo});
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }

    }
}

module.exports = new userController();