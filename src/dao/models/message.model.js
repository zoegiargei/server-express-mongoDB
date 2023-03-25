import mongoose from "mongoose";

const messCollection = 'messages';

const messSchema = new mongoose.Schema({

    name: {type:String, require:true},
    mess : {type:String, require:true}

}, { versionKey: false } );

export const messageModel = mongoose.model( messCollection, messSchema );