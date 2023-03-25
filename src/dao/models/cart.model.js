import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({

    productsCart: { type:Array, default:[] }
}, { versionKey: false } );

export const cartModel = mongoose.model( cartCollection, cartSchema );