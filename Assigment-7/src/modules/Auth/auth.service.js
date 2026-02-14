import { UserModel } from './../../DB/model/user.model.js';
export const signup = async (inputs)=>{
    const {u_email} = inputs;
    console.log(u_email);
    const user = await UserModel.findOne({where:{u_email}});
    if(user){
        throw new Error("Email already exists")
    }
    await UserModel.build(inputs).save();
    return user;
}
