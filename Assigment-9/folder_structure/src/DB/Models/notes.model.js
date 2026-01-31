import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    validate: {
      validator: (val) => {
        return val !== val.toUpperCase() || val.length === 0;
      },
      message:'Title is not entirely uppercase'
    },
    required:true
  },
  content:{
    type:String,
    required:[true,"content is required."]
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true,"user id is required."]
  },
},{
    timestamps:true
});


export default mongoose.model('Note', noteSchema);
