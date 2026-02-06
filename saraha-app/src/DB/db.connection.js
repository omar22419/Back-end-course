import mongoose from 'mongoose';
import { DB_URI } from '../../config/config.service.js';
import { UserModel } from './Models/user.model.js';

export const connectDB = async()=>{
    try{
        await mongoose.connect(DB_URI);
        await UserModel.syncIndexes()
        console.log("DB connected")
    }catch(error){
        console.log(error)
    }
}