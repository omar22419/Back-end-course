import {Sequelize} from "sequelize";


export const sequelize= new Sequelize()


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