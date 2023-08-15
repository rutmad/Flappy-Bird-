import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({ name: String, password: String });

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;