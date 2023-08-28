import UserModel from "./userModel";
import jwt from "jwt-simple";
const secret: string = "mysecret";

export const login = async (req: any, res: any) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);

    const userDB = await UserModel.findOne({ name, password });

    if (!userDB) throw new Error("Username or password are incorrect");

    const token = jwt.encode({ userId: userDB._id, role: "client" }, secret);
    console.log(token);

    res.cookie("user", token, { maxAge: 500000000, httpOnly: true });

    res.status(201).send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const addUser = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const userDB = await UserModel.create({
      name,
      email,
      password,
      score: 0,
    });
    console.log(userDB);

    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("did not get user");
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
export const saveScore = async (req: any, res: any) => {
  try {
    const { name, score } = req.body;

    const { user } = req.cookies;

    const decoded = jwt.decode(user, secret);
    console.log(decoded);
    const { userId, role } = decoded;

    const userDB: any = await UserModel.findOne({
      _id: userId,
    });

    if (!userDB) {
      console.log("User not found:", userId);
      throw new Error("User not found");
    }

    if (userDB.score < score) {
      userDB.score = score;
      await userDB.save();
    }

    console.log("Score updated successfully");

    res.status(200).send({ success: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getLeaderboard = async (req: any, res: any) => {
  try {
    const leaderboard = await UserModel.find({}).sort({ score: -1 }).limit(10);
    res.json({ leaderboard });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
