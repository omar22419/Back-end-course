import { compare, genSalt, hash } from "bcrypt";
import { SALT_ROUND } from "../../../../config/config.service.js";
import * as argon2 from "argon2";
import { hashApproachEnum } from "../../Enums/index.js";


export const generateHash = async({plainText,salt=SALT_ROUND,minor='b',approach=hashApproachEnum.bcrypt}={})=>{
    let hashValue
    switch(approach){
        case hashApproachEnum.argon2:
            hashValue = await argon2.hash(plainText)
            break;
        default:
            const generatedSalt = await genSalt(salt,minor)
            hashValue = await hash(plainText,generatedSalt)
            break;
    }
    return hashValue
    
}

export const compareHash = async({plainText,cipherText,approach=hashApproachEnum.bcrypt}={})=>{
    let match = false
    switch(approach){
        case hashApproachEnum.argon2:
            match = await argon2.verify(cipherText,plainText)
            break;
        default:
            match = await compare(plainText,cipherText)
            break;
    }
    return match
}