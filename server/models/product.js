const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    images:[
        {
        type:String,
        required:true,
    }
    ],
    brand:{
        type:String,
        default:'',
    },
    price:{
        type:Number,
        default:0,
    },
    oldPrice:{
        type:Number,
        default:0,
    },
//    catName: {
//        type: String,
//        required: true, // Now catName must be provided when creating a product
//        trim: true, // Removes extra spaces
//    },
    
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    //subCat:{
      //  type:String,
      //  ref:'SubCategory',
      //  required:true,
      //  },
    countInStock:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        default:0,
    },
    isFeatured:{
        type:Boolean,
        default:null,
    },
    discount:{
        type:Number,
        default:0,
    },

//    productRAMS:{
  //      type:mongoose.Schema.Types.ObjectId,
    //    default:null,
    //},
    //productSIZE:{
      //  type:mongoose.Schema.Types.ObjectId,
       // default:null,
    //},
   // productWEIGHT:{
     //   type:mongoose.Schema.Types.ObjectId,
       // default:null,
    //},
    dateCreated:{
        type:Date,
        default:Date.now,
    },
})

productSchema.virtual('id').get(function(){
    return this._id.toHexString();
  
});
productSchema.set('toJSON',{
    virtuals:true,
});


exports.Product = mongoose.model('Product', productSchema);
exports.productSchema = productSchema;