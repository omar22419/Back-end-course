import {Sequelize} from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../../config/config.service.js";


export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  port: 3306,
  dbName: DB_NAME,
  username: DB_USER,
});

export async function checkDBConnection(){
    try{
        await sequelize.sync({
            alter:false, force: false
        });
        console.log("DB is connection")
    }catch(err){
        console.log("DB is not connection")
    }
}