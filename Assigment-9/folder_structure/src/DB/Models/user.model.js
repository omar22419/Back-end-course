import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  age: {
    type: Number,
    min: [18, "The age must be above or equal 18"],
    max: [60, "The age must be less than or equal 60"],
    required: true,
  },
  phone: { type: String, required: [true, 'Phone is required'] },
},{
    timestamps:true
});

export default mongoose.model("User", userSchema)