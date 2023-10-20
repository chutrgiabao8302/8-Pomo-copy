import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    title: { type: String },
    content: { type: String },
    duration: {type: Number},
    status: {type: String, default: 'Do-ing'},
    note: { type: String },
    owner: {type: mongoose.Types.ObjectId, ref: 'Account'}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", Task);
