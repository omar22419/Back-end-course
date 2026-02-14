import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const UserModel = sequelize.define(
  "User",
  {
    u_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    u_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "Name must be more than 3 characters",
        },
        notNull: {
          msg: "Name is required",
        },
        notEmpty: {
          msg: "Name cannot be empty",
        },
      },
    },
    u_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: "Email already exists",
      },
      validate: {
        len: {
          args: [3, 100],
          msg: "Email must be more than 3 characters",
        },
        notNull: {
          msg: "Email is required",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
        isEmail: {
          msg: "Email is not valid",
        },
      },
    },
    u_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: {
          args: [7, 255],
          msg: "Password must be more than 6 characters",
        },
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password cannot be empty",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: true,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  },
);

export default UserModel;