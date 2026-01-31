import mongoose from 'mongoose';

export const checkDBConnection = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log("DB connected successfully")
    }catch(error){
        console.log("DB  connection failed",error)
    }
}