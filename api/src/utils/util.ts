import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import {v4 as uuid4}  from 'uuid';

dotenv.config();

export const encryptPassword = (password:string) => {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const generateTrxRef=()=>{
    return uuid4();
}


export const paymentHeader = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
    },
};
