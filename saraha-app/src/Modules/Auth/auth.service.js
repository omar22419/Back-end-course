import { NotFoundException, ConflictException } from './../../common/utils/response/error.response';
export const signup = async (inputs)=>{
    const {username,email,password,phone}=inputs;
    const userCheck = await UserModel.findOne({email});
    if(userCheck){
        throw ConflictException({message:"User already exists"});
    }
    const user = new UserModel.create({username,email,password,phone})
    return user
}

export const login = async (inputs)=>{
    const {email,password}=inputs;
    const user = await UserModel.findOne({email,password});
    if(!user){
        throw NotFoundException({message:"Invalid login credentials"});
    }
    return user
}