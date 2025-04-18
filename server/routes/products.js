const {Category} = require('../models/category.js');
const {Product} = require('../models/product.js');
const express = require('express');
const router = express.Router();

const multer = require('multer');
const fs = require("fs");

var imagesArr=[];
var productEditId;

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
  })

  const upload = multer({ storage: storage })



 router.post(`/upload`,upload.array("images"), async (req,res) => {
    let images;

     if(productEditId!==undefined){
         const product = await Product.findById(productEditId);
 
         if(product){
            images = product.images;
         }
 
         if(images.length!==0){
             for (image of images){
                 fs.unlinkSync(`uploads/${image}`);
             }
             productEditId="";
         }
        
        }  
        imagesArr=[];
        const files = req.files;
        
        for(let i=0; i<files.length; i++){
            imagesArr.push(files[i].filename);
        
        }
        res.send(imagesArr);  
        
   });

   router.get('/api/product', async (req, res) => {
    try {
        const { category } = req.query; // Get category from query params
        let filter = {}; 

        if (category) {
            filter.category = category; // Apply filtering only if category is provided
        }

        console.log("Filter applied:", filter); // Debugging

        const products = await Product.find(filter);
        
        res.json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
});



router.get(`/`, async (req,res) => {

    
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await Product.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if(page > totalPages){
        return res.status(404).json({message:"Page not Found"})
    }

    const productList = await Product.find().populate("category")
    .skip((page -1) * perPage)
    .limit(perPage)
    .exec();
    
    if (!productList){
        res.status(500).json({success:false})
    }

    return res.status(200).json({
        "products":productList,
        "totalPages":totalPages,
        "page":page
    });
    
    res.send(productList);
});


router.get(`/featured`, async (req,res) => {
    const productList = await Product.find({isFeatured:true});

    if (!productList){
        res.status(500).json({success:false})
    }

    return res.status(200).json(productList);
});

router.post('/create', async (req,res) =>{

    const category = await Category.findById(req.body.category);
    if (!category){
       return res.status(404).send("Invalid Category!");
    }



    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        images:imagesArr,        
        brand: req.body.brand,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated,
        discount:req.body.discount,
    });

    product = await product.save();

    if (!product){
        res.status(500).json({
            error:err,
            success:false})
    }
    res.status(201).json(product)
    });



    

    router.get(`/:id`, async (req,res) => {
        productEditId= req.params.id;

        const product = await Product.findById(req.params.id);
    
        if (!product){
            res.status(500).json({ message: 'The product with the given ID was not found,'})
        }
        return res.status(200).send(product);
    })



    router.delete(`/:id`, async (req,res) => {

        const product = await Product.findById(req.params.id);
        const images = product.images;

        if(images.length!==0){
            for(image of images){
                fs.unlinkSync(`uploads/${image}`)
            }
        }

        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    
        if (!deleteProduct){
            return res.status(404).json({ 
                message: 'Product not found',
                success:false
            })
        }
        res.status(200).send({
            message:'Product is Deleted!',
            success:true
        })
    
    });


router.put(`/:id`, async (req,res) => {
        
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                    name: req.body.name,
                    description: req.body.description,
                    images:imagesArr,        
                    brand: req.body.brand,
                    price: req.body.price,
                    oldPrice: req.body.oldPrice,
                    category: req.body.category,
                    countInStock: req.body.countInStock,
                    rating: req.body.rating,
                    numReviews: req.body.numReviews,
                    isFeatured: req.body.isFeatured,
                    dateCreated: req.body.dateCreated,
                    discount:req.body.discount,
                    
            },
            {new:true}
        );
    
        if (!product){
            res.status(404).json({ 
                message: 'Product cannot be updated!',
                success:false
            })
        }
        res.status(200).json({ 
            message: 'Product is updated!',
            success:true
        });

    })


module.exports = router;
