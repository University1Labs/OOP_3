require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require('./routes/authRouter');
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const cors = require('cors')
const fileUpload = require("express-fileupload")
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname,'static')));

app.use('/api',authRouter);
app.use('/api',adminRouter);
app.use('/api',userRouter);

const start = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://admin:admin@cluster0.ujgmtjk.mongodb.net/?retryWrites=true&w=majority");
        app.listen(PORT,()=>{
            console.log(`Server started on PORT ${PORT}`);
        });

    }
    catch(e){
        console.log(e);
    }
}

start();