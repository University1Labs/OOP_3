const Router = require("express");

const userRouter = new Router();
const userController = require("./../controllers/userController");
const authMiddleware = require("./../middlwares/authMiddleware");

userRouter.get("/devices",authMiddleware.Authorized,userController.getDevices);
userRouter.post("/device",authMiddleware.Authorized,userController.getDevice);
userRouter.get("/brands",authMiddleware.Authorized,userController.getBrands);
userRouter.get("/types",authMiddleware.Authorized,userController.getTypes);
userRouter.post("/brands/filter",authMiddleware.Authorized,userController.filterBrands);
userRouter.post("/types/filter",authMiddleware.Authorized,userController.filterTypes);
userRouter.post("/types_brands/filter",authMiddleware.Authorized,userController.filterBrands_Types);
userRouter.get("/basket",authMiddleware.Authorized,userController.getBasket);
userRouter.post("/basket",authMiddleware.Authorized,userController.updateBasket);

module.exports = userRouter;