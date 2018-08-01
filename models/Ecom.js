const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let ecomSchema = new Schema(
    {
        productId:{
            type:String,
            unique:true
        },
        productName:{
            type:String,
            default:''
        },
        description:{
            type:String,
            default:''
        },
        quantity:{
            type:Number,
            default:0
        },
        category:{
            type:String,
            default:''
        },
        isInCart:{
            type:Boolean,
            default:false
        },
        created:{
            type:Date,
            default:Date.now
        },
        sellerName:{
            type:String,
            default:''
        }


    }
)

mongoose.model('Ecom', ecomSchema);