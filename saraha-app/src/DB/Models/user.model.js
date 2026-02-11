import mongoose from 'mongoose';
import { GenderEnum, ProviderEnum } from './../../common/Enums/index.js';

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:25
    },
    lastName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:25
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    confirmEmail:Date,
    gender:{
        type:Number, enum:Object.values(GenderEnum), default:GenderEnum.Male
    },
    profilePicture:{
        type:String
    },
    coverProfilePicture:{
        type:String
    },
    provider:{
        type:Number, enum:Object.values(ProviderEnum), default:ProviderEnum.System
    },
    changeCredentialsTime:{
        type:Date
    }
},{
    timestamps:true,
    collection:"users",
    strict:true,
    strictQuery:true,
    autoIndex:true,
    optimisticConcurrency:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})


userSchema.virtual('username').set(function(value){
    const [firstName,lastName]=value?.split(' ')||[]
    this.set({firstName,lastName})
}).get(function(){
    return this.firstName +" "+this.lastName
})


export const UserModel = mongoose.models.User || mongoose.model("User",userSchema)