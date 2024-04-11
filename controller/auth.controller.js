import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const createUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPass,
      },
    });
    res.status(200).json({ message: "User Created Successfully!" });
  } catch (e) {
    res.status(400).json({ message: "Error while creating the user!", e });
  }
};

export const login = async (req, res) => {
  const age = 1000 * 60 * 60 * 24 * 7;
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const passCheck = await bcrypt.compare(password, user.password);

    if (!user) {
      res.status(500).json({ message: "Invalid Credentials" });
    } else if (passCheck) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: age }
      );

      res.cookie("token", token, {
        httpOnly: true,
        // secure:true (turn it on in production)
        maxAge: age,
      });

      res.status(200).json(user);
    } else {
      res.status(500).json({ message: "Invalid Credentials" });
    }
  } catch (e) {
    res.status(500).json({ message: "Unable to login!", error: e });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token")
  res.status(200).send("logout successfull");
};
