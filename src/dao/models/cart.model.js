import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({

    //productsCart: { type:Array, default:[] }
    productsCart: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: Number
            }
        ],
        default: []
    }

}, { versionKey: false } );


cartSchema.pre(/^find/, function(next) {
    this.populate('productsCart.product')
    next()
});

export const cartModel = mongoose.model( cartCollection, cartSchema );