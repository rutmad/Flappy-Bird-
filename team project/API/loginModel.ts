import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
});

export default mongoose.model("User", userSchema);
