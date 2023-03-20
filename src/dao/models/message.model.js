import mongoose, { Schema } from "mongoose";

const messCollection = 'messages';

const messSchema = new mongoose.Schema({

    idMessage: Schema.Types.ObjectId,
    message: { type:Object }

}, { versionKey: false } );

export const messageModel = mongoose.model( messCollection, messSchema );