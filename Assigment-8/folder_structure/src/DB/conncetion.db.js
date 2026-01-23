import { DB_NAME, DB_URI } from "../../config/config.service.js";
import { MongoClient } from 'mongodb';

const client = new MongoClient(DB_URI,{serverSelectionTimeoutMS:30000});

// Database Name
export const dbName = DB_NAME;
export const db = client.db(dbName);

export const authenticateDB = async()=>{
    try{
        await client.connect();
        console.log('Connecting to database...');
    }catch(err){
        console.log('Error connecting to database', err);
    }
}