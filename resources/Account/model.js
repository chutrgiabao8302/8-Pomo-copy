import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Account = new Schema(
  {
    username: { type: String },
    password: { type: String },
    email: {type: String},
    address: { type: String },
    age: { type: Number },
    main_color: {type: String}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Account", Account);
