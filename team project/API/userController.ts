import UserModel from "./userModel";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import jsonwebtoken from "jsonwebtoken";

const secret: string = "mysecret";

export const addUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const userDB = await UserModel.findOne({ email });

    if (!userDB) {
      throw new Error("Username or password are incorrect");
    }

    const passwordMatch = await bcrypt.compare(password, userDB.password || "");

    if (!passwordMatch) {
      throw new Error("Username or password are incorrect");
    }

    const token = jsonwebtoken.sign(
      { userId: userDB._id, role: "public" },
      secret
    );

    res.cookie("user", token, {
      maxAge: 500000000,
      httpOnly: true,
      secure: true,
    });

    res.status(201).send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getUser = async (req: any, res: any) => {
  try {
    const { user } = req.cookies;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const decoded = jsonwebtoken.verify(user, secret) as { userId: string };

    if (!decoded.userId) {
      throw new Error("User not authenticated");
    }

    const userDB = await UserModel.findById(decoded.userId);

    if (!userDB) {
      throw new Error("User not found");
    }

    res.send({ ok: true, user: userDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
