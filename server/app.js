const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const server = http.createServer(app);
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env file
//const authJwt = require('./helper/jwt');



app.use(cors());
app.options('*',cors())

//middleware (to read properly)
app.use(bodyParser.json());
app.use(express.json());
//app.use(authJwt());

//Routes
const userRoutes = require ('./routes/user')
const categoryRoutes = require('./routes/categories');
//const subCatRoutes = require('./routes/subCat');
const productRoutes = require('./routes/products');
//const productRAMSRoutes = require('./routes/productRAMS.js')
//const productWeightRoutes = require('./routes/productWeight.js')
const reviewRoutes = require("./routes/reviewRoutes");

const orderRoutes = require("./routes/orderRoutes"); // Import order routes
app.use("/api/order", orderRoutes); // Register order routes


app.use("/api/reviews", reviewRoutes);
app.use('/uploads', express.static("uploads"));
app.use('/api/category', categoryRoutes);
//app.use('/api/subCat', subCatRoutes);
app.use('/api/product', productRoutes);
//app.use('/api/productWeight', productWeightRoutes);
//app.use('/api/productRAMS', productRAMSRoutes);
app.use('/api/user',userRoutes);


//Database
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection is ready...');
    //server start
        app.listen(process.env.PORT, () => {
            console.log(`server is running http://localhost:${process.env.PORT}`);
        })
})
.catch((err)=> {
    console.log(err);
})

