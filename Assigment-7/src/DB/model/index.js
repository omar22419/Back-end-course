import User from "./user.model.js";
import Post from "./post.model.js";
import Comment from "./comment.model.js";

User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


Post.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});


User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});


Post.hasMany(Comment, {
  foreignKey: "c_post_id",
  as: "comments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


Comment.belongsTo(Post, {
  foreignKey: "c_post_id",
  as: "post",
});

export { User, Post, Comment };