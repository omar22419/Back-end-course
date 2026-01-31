import { DataTypes } from "sequelize";
import {sequelize} from "../connection.db.js";

export const UserModel = sequelize.define("User",{
    u_id:{
        type:DataTypes.CHAR,
        autoIncrement:true,
        primaryKey:true
    },
    u_name:{
        
    }
})