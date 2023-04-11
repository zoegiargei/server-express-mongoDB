import { JWT_PRIVATE_KEY } from "../config/auth.config.js";
import jwt from "jsonwebtoken";

export async function encrypt(user){
    const token = jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: '24h' });
    return token
};

export async function decrypt(token){
    
    return new Promise((res, rej) => {
        jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
            if(err){
                rej(err)
            } else {
                res(decoded)
            }
        })
    })
};