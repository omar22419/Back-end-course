import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const CommentModel = sequelize.define(
    "Comment",
  {
    c_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    c_content: {
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
    c_post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Post ID is required",
        },
      },
      references: {
        model: "posts",
        key: "p_id",
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
        }
    }
},{
    modelName:"Comment",
    tableName:"comments",
    timestamps:true,
});

export default CommentModel;