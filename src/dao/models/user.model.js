import mongoose, { Schema } from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({

    first_name: { type:String, required:true },
    last_name: { type:String, required:true },
    email: { type:String, required:true },
    age: { type:String, required:true },
    password: { type:String, required:true },
    role: { type:String, required:true }
    
}, { versionKey: false } );

export const userModel = mongoose.model(userCollection, userSchema);