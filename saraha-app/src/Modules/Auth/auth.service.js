import { SALT_ROUND } from "../../../config/config.service.js";
import { createOne, findOne, UserModel } from "../../DB/index.js";
import {
  NotFoundException,
  ConflictException,
  generateHash,
  compareHash,
  encrypt,
  decrypt,
} from "./../../common/utils/index.js";

export const signup = async (inputs) => {
  const { username, email, password, phone } = inputs;
  const userCheck = await findOne({
    model: UserModel,
    filter: { email },
  });
  if (userCheck) {
    throw ConflictException({ message: "User already exists" });
  }
  const user = await createOne({
    model: UserModel,
    data: { email, password:await generateHash({plainText:password}), phone: await encrypt(phone), username },
  });
  return user;
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
