import User from "../../DB/Models/user.model.js";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { hashingPassword } from "../../Utils/hash.js";

export const signup = async (inputs) => {
  const { name, email, password, phone, age } = inputs;
  if (await User.findOne({ email })) {
    throw new Error("Email already exists");
  }
  const hashedPassword = hashingPassword(password);
  const encryptedPhone = CryptoJS.AES.encrypt(
    phone,
    process.env.SECRET,
  ).toString();

  return await User.create({
    name,
    email,
    password: hashedPassword,
    phone: encryptedPhone,
    age,
  });
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credential");
  }
  const hashedPassword = hashingPassword(password);
  if (hashedPassword !== user.password) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const updateUser = async (userId, inputs) => {
  if (inputs.email ) {
    const user = await User.findOne({
      email:inputs.email,
      _id:{$ne:userId}
    })
    if(user){
      throw new Error("Email already exists");
    }
  }
  const user = await User.findByIdAndUpdate(userId, inputs); 
  if(!user){
    throw new Error("User not found")
  }
  return user;
};

export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if(!user){
    throw new Error('user not found')
  }
  return {message: "User deleted successfully"} ;
};

export const getUser = async (userId) => {
  return await User.findById(userId);
};
