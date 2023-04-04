import mongoose, { Schema } from "mongoose";

const sessionCollection = 'sessions';

const sessionSchema = new mongoose.Schema({
    session : {type: Object, required: true}
});

export const sessionModel = mongoose.model(sessionCollection, sessionSchema)