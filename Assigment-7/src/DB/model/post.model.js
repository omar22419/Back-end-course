import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const PostModel = sequelize.define(
  "Post",
  {
    p_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    p_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "Title must be more than 3 characters",
        },
        notNull: {
          msg: "Title is required",
        },
        notEmpty: {
          msg: "Title cannot be empty",
        },
      },
    },

    p_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Content is required",
        },
        notEmpty: {
          msg: "Content cannot be empty",
        },
      },
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"users",
            key:"u_id"
            },
            validate:{
                notNull:{
                    mes:"User Id is required"
                }
            },
    }
  },{
    tableName: "posts",
    timestamps: true,
    paranoid: true,
    modelName: "Post",
  }
);     

export default PostModel;