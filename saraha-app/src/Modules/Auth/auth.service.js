import { createOne, findOne, UserModel } from "../../DB/index.js";
import {
  NotFoundException,
  ConflictException,
  generateHash,
  compareHash,
  encrypt,
  decrypt,
  sendOtpEmail,
  createLoginCredentials,
  BadRequestException,
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

export const verifyEmail = async ({ email, otp } = {}) => {
  const user = await findOne({
    model: UserModel,
    filter: { email, provider: providerEnum.System },
  });
  if (!user) {
    return NotFoundException({ message: "Account not found" });
  }
  if (user.confirmEmail) {
    return ConflictException({ message: "Email already verified" });
  }

  if (!user.otpExpires || user.otpExpires < new Date()) {
    return BadRequestException({ message: "OTP has expired, please request a new one" });
  }

  const isValidOtp = await compareHash(otp, user.otp);
  if (!isValidOtp) {
    return BadRequestException({ message: "Invalid OTP code" });
  }

  await updateOne({
    model: UserModel,
    filter: { _id: user._id },
    update: { $set: { confirmEmail: new Date() }, $unset: { otp: 1, otpExpires: 1 } },
  });
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


export const login = async (inputs,issuer) => {
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
  if (!match) {
    throw NotFoundException({
      message: "Invalid login credentials",
    });
  }
  return await createLoginCredentials(user,issuer);
};


const verifyGoogleAccount = async (idToken) => {
   const client = new OAuth2Client();
   const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_IDS,
  });
  const payload = ticket.getPayload();
  console.log({payload});
  if (!payload?.email_verified) {
    throw BadRequestException({message:"Fail to verify this account with Google"})
  }
  return payload
}



export const signupWithGmail = async ({idToken}, issuer) => {
  const payload = await verifyGoogleAccount(idToken)
  const checkUserExist = await findOne({model: UserModel, filter:{email:payload.email}})
  console.log({checkUserExist});
  if (checkUserExist) {
    if (checkUserExist?.provider == providerEnum.System) {
      throw ConfilectException({message: "Account already exist with different provider"})
    }
    const account = await loginWithGmail({idToken}, issuer)
    return {account, status:200}
  }
  

  const user = await create({model: UserModel, data:[{
    firstName: payload.given_name,
    lastName: payload.family_name,
    email:payload.email,
    provider: providerEnum.Google,
    profilePic: payload.picture,
    confirmEmail: new Date()
  }]})
  return {account: await createLoginCredentials(user[0], issuer)}
}




export const loginWithGmail = async ({idToken}, issuer) => {
  const payload = await verifyGoogleAccount(idToken)
  const user = await findOne({model: UserModel, filter:{email:payload.email, provider:providerEnum.Google}})
  console.log({checkUserExist});
  if (!user) {
    throw NotFoundException({ message: "Invalid login data" });
  }
  return await createLoginCredentials(checkUserExist, issuer)
}