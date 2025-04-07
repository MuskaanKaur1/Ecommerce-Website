const {ProductRams} = require('../models/productRAMS');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req,res) => {

    try{
        const productRamsList = await ProductRams.find()
        
        if (!productRamsList){
            res.status(500).json({success:false})
        }

        return res.status(200).json(productRamsList);

    }catch(error){
        res.status(500).json({success:false})
    }
      
});


router.post('/create', async (req,res) =>{


    let productRAMS = new ProductRams({
        productRam: req.body.productRam,
    });

    if (!productRAMS){
        res.status(500).json({
            error:err,
            success:false
        })
    }

    productRAMS = await productRAMS.save();

    res.status(201).json(productRAMS)
});

router.delete(`/:id`, async (req,res) => {

        const deletedItem = await ProductRams.findByIdAndDelete(req.params.id);
    
        if (!deletedItem){
            return res.status(404).json({ 
                message: 'Item not found',
                success:false
            })
        }
        res.status(200).send({
            message:'Item Deleted!',
            success:true
        })
    
});

router.put(`/:id`, async (req,res) => {
        
        const item = await ProductRams.findByIdAndUpdate(
            req.params.id,
            {
                productRam: req.body.productRam,
            },
            {new:true}
        );
    
        if (!item){
            res.status(500).json({ 
                message: 'Item cannot be updated!',
                success:false
            })
        }
        res.status(200).json({ 
            message: 'Item is updated!',
            success:true
        });

        res.send(item);

    });

module.exports = router;