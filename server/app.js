const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env file


app.use(cors());
app.options('*',cors())

//middleware (to read properly)
app.use(bodyParser.json());
app.use(express.json());


//Routes
const userRoutes = require ('./routes/user')
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes"); // Import order routes

app.use("/api/order", orderRoutes); // Register order routes
app.use("/api/reviews", reviewRoutes);
app.use('/uploads', express.static("uploads"));
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
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

