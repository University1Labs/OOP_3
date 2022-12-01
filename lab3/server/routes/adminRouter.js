const Router = require("express");

const adminController = require("./../controllers/adminController");
const adminRouter = new Router();
const authMiddleware = require("./../middlwares/authMiddleware");

adminRouter.post("/add_device",authMiddleware.Admin,adminController.addDevice);
adminRouter.post("/add_brand",authMiddleware.Admin,adminController.addBrand);
adminRouter.post("/add_type",authMiddleware.Admin,adminController.addType);


module.exports = adminRouter;