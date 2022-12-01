const deviceModel = require("./../models/deviceModel");
const brandModel = require("./../models/brandModel");
const typeModel = require("./../models/typeModel");
const uuid = require("uuid");
const path = require("path");

class adminController{
    async addDevice(req,res){
        try{
            const {name,price,description,brand,type} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname,'..','static',fileName));
            const Brand = await brandModel.findOne({name:brand});
            const Type = await typeModel.findOne({name:type});
            const newDevice = new deviceModel({name,price,img:fileName,description,brand:Brand.name,type:Type.name});
            await newDevice.save();
            return res.json({message:"Device has been added"});
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }
    }
    async addBrand(req,res){
        try{
            const {name} = req.body;
            const newBrand = new brandModel({name});
            await newBrand.save();
            return res.json({message:"Brand has been added"});
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }
    }
    async addType(req,res){
        try{
            const {name} = req.body;
            const newType = new typeModel({name});
            await newType.save();
            return res.json({message:"Type has been added"});
        }
        catch(e){
            console.log(e);
            return res.json({message:"Error"});
        }
    }
}

module.exports = new adminController();