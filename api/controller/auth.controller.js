import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //   console.log(hashedPassword);

    // create a new user and save to db
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ messsege: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsege: "Failed to create user" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user)
      return res.status(401).json({ messsege: "Invalid Credentials! " });

    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ messsege: "Invalid Credentials! " });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success! ");

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true
        maxAge: age,
      })
      .status(200)
      .json("Login Successful! ");
  } catch (err) {
    console.log(err);
    res.status(500).json({ messege: "Failed to login! " });
  }
};
export const logout = (req, res) => {
  //dp operations
};
