import { UserModel } from "./../../DB/model/user.model.js";

export const createOrUpdateUser = async (id, inputs) => {
  await UserModel.upsert({ id: parseInt(id), ...inputs }, { validate: false });
};

export const findUserByEmail = async (email) => {
  const user = await UserModel.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
  });
  return user ? user.toJSON() : null;
};

export const getUserByIdExcludeRole = async (id) => {
  const user = await UserModel.findByPk(id, {
    attributes: { exclude: ["password", "role"] },
  });
  return user ? user.toJSON() : null;
};
