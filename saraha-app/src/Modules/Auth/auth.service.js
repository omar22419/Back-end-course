import { createOne, findOne, UserModel } from "../../DB/index.js";
import {
  NotFoundException,
  ConflictException,
  generateHash,
  compareHash,
  encrypt,
  decrypt,
  sendOtpEmail,
} from "./../../common/utils/index.js";


const generateOTP = ()=>{
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const signup = async (inputs) => {
  const { username, email, password, phone } = inputs;
  const userCheck = await findOne({
    model: UserModel,
    filter: { email },
  });
  if (userCheck) {
    throw ConflictException({ message: "User already exists" });
  }
  const otp = generateOTP();
  const otpExpire = new Date(Date.now() +10*60*1000);
  const user = await createOne({
    model: UserModel,
    data: { email, password:await generateHash({plainText:password}), phone: await encrypt(phone), username, otp:await generateHash(otp,undefined), otpExpire },
  });

  try{
    await sendOtpEmail(email,otp);
  }catch(error){
    throw new Error("Failed to send email");
  }

  return {user, message: "User created successfully please verify your email"};
};




export const verifyOtp = async (inputs) => {
  const { otp,email } = inputs;
  const user = await findOne({
    model: UserModel,
    filter:{email}
  });
  if(!user){
    throw NotFoundException({message:"User not found"})
  }
  if(!user.otp||!user.otpExpire){
    throw NotFoundException({message:"No OTP found for this User"})
  }
  if(new Date()>user.otpExpire){
    throw ConflictException({message:"OTP expired"});
  }
  const match = await compareHash({plainText:otp,cipherText:user.otp})
  if(!match){
    throw NotFoundException({message:"Invalid OTP"});
  }
  user.confirmEmail = new Date();
  user.otp = undefined;
  user.otpExpire = undefined;
  await user.save();
  return {
    message:"Email verified successfully",
    verified:true
  };
};


export const login = async (inputs) => {
  const { email, password } = inputs;
  const user = await findOne({
    model: UserModel,
    filter: {email},
    options: { lean: true },
  });
  if (!user) {
    throw NotFoundException({
      message: "Invalid login credentials",
    });
  }
  const match = await compareHash({plainText:password, cipherText:user.password})
  user.phone = await decrypt(user.phone)
  return {match,user};
};
