const express = require("express");
const cors = require('cors')
const connectDB = require("./config/connectDB");
const path  = require('path');
const authRouter = require("./routes/auth");
const productRouter= require("./routes/product")
const uploadRoute= require("./routes/uploadRoute")
const orderRoute = require( './routes/order');
const rateRouter = require("./routes/rate");
require("dotenv").config({ path: "./config/.env" });
const app = express();


//middleWares
app.use(express.json());
/*app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));*/



//start the server
connectDB();

//routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use('/api/uploads', uploadRoute);
app.use('/api/orders', orderRoute);
app.use("/api/rate", rateRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send( process.env.PAYPAL_CLIENT_ID);
});

/*app.use('/uploads', express.static(path.resolve(__dirname, '/uploads')));
app.use(express.static(path.resolve(__dirname, '/client/build')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '/client/build/index.html'))
);*/

//lunch the Server
const port = process.env.PORT || 5001;
app.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`The Serveris Running on port ${port}....`);
});