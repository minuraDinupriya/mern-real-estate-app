import bcrypt from "bcrypt";

export const register=async (req,res)=>{
    const {username, email, password}=req.body;

    // hashing the password
    const hashedPassword=await bcrypt.hash(password,10)
    console.log(hashedPassword);

    // create a new user and save to db
}
export const login=(req,res)=>{
    //dp operations
}
export const logout=(req,res)=>{
    //dp operations
}
