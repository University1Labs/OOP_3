require("dotenv").config();

const jwt = require("jsonwebtoken");
const jwt_secret = process.env.SECRET;

class authMiddleware{
    Authorized(req,res,next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            if (!token){
                return res.json({message:"Not authorized"});
            }
            const data = jwt.verify(token,jwt_secret);
            req.user = data;
            next();
        }
        catch(e){
            console.log(e);
            return res.json({message:"Not authorized"});
        }
    }
    Admin(req,res,next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            if (!token){
                return res.json({message:"Not authorized"});
            }
            const data = jwt.verify(token,jwt_secret);
            console.log(data);
            if (data.role !== "ADMIN"){
                return res.json({message:"Available for admins"});
            }
            req.user = data;
            next();
        }
        catch(e){
            console.log(e);
            return res.json({message:"Not authorized"});
        }
    }
}


module.exports = new authMiddleware();