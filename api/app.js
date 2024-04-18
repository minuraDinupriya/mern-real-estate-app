import express from "express";

const app=express();

app.use("/api/test",(req, res)=>{
    res.send("It works")
})
app.use("/api/auth/register",(req, res)=>{
    res.send("It works")
})
app.use("/api/auth/login",(req, res)=>{
    res.send("It works")
})
app.use("/api/auth/logout",(req, res)=>{
    res.send("It works")
})
app.use("/api/posts",(req, res)=>{
    res.send("It works")
})
app.use("/api/post/12312",(req, res)=>{
    res.send("It works")
})

app.listen(8800,()=>{
    console.log("Server is running");
})