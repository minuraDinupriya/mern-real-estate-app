import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try{
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
   res.status(201).json({messsege:"User created successfully"})
   }catch(err){
     console.log(err);
     res.status(500).json({messsege:"Failed to create user"})

  }
};
export const login = async(req, res) => {
  
  // CHECK IF THE USER EXISTS
  const user=prisma.user.findUnique({
    where:{username:username}
  })

  if(!user) return res.status(401).json({messsege:"Invalid Credentials! "})

  // CHECK IF THE PASSWORD IS CORRECT
  

  // GENERATE COOKIE TOKEN AND SEND TO THE USER
};
export const logout = (req, res) => {
  //dp operations
};
