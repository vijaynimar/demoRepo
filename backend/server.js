import express from "express"
import cors from "cors"
const app=express()
app.use(cors())
app.use(express.json())
let arr=[]

app.post("/insertData",(req,res)=>{
    const {email,password}=req.body
    let currentLength=arr.length
    arr.push({id:currentLength+1,email:email,password:password})
    res.send("added sucessfully")
})
app.get("/getData",(req,res)=>{
res.send(arr)
})
app.listen(2000,()=>{
    console.log("server started at port 2000");
})