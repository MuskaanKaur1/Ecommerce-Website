const {ProductWeight} = require('../models/productWeight');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req,res) => {

    try{
        const productWeightList = await ProductWeight.find()
        
        if (!productWeightList){
            res.status(500).json({success:false})
        }

        return res.status(200).json(productWeightList);

    }catch(error){
        res.status(500).json({success:false})
    }
      
});


router.post('/create', async (req,res) =>{


    let productWeight = new ProductWeight({
        name: req.body.name,
    });

    if (!productWeight){
        res.status(500).json({
            error:err,
            success:false
        })
    }

    productWeight = await productWeight.save();

    res.status(201).json(product)
});

router.delete(`/:id`, async (req,res) => {

        const deletedItem = await ProductWeight.findByIdAndDelete(req.params.id);
    
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
        
        const item = await ProductWeight.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
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