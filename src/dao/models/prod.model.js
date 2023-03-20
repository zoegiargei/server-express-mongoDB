import mongoose from 'mongoose';

const prodCollection = 'products';

const prodSchema = new mongoose.Schema({

    //Propiedades que tendran nuestros productos en la base de datos
    title: { type:String, required:true },
    description: { type:String, required:true },
    code: { type:String, required:true },
    price: { type:String, required:true }, 
    status: { type:Boolean, default:true, required:true },
    stock: { type:String, required:true },
    category: { type:String, required:true },
    thumbnail: {
        type: [{ type:Array, required:true, cast:false }]
        /*         validate: {
            validator: v => Array.isArray(v) && v.length > 0,
            message: "Array can't be empty"
        } */    
    }
}, { versionKey: false } );

export const prodModel = mongoose.model( prodCollection, prodSchema );