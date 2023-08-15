import UserModel from "./userModel";
import jwt from "jwt-simple";
const secret: string = "mysecret";

export const addUser = async (req: any, res: any) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);
    const userDB = await UserModel.create({
      name,
      password,
    });
    console.log(userDB);

    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("did not get data");
  }
};
export const login = async (req: any, res: any) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);

    const userDB = await UserModel.findOne({ name, password });

    if (!userDB) throw new Error("Username or password are incorrect");

    const token = jwt.encode({ userId: userDB._id, role: "public" }, secret);
    console.log(token);

    res.cookie("user", token, { maxAge: 500000000, httpOnly: true });

    res.status(201).send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getUser = async (req: any, res: any) => {
  try {
    const { user } = req.cookies;

    const decoded = jwt.decode(user, secret);
    console.log(decoded);
    const { userId, role } = decoded;

    const userDB: any = await UserModel.findById(userId);

    res.send({ ok: true, user: userDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};