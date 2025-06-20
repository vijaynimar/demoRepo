import express from "express"
import cors from "cors"
import {connect,Schema,model} from "mongoose"
const app=express()
app.use(cors())
app.use(express.json())

async function connectToDb(){
    try{
        await connect("mongodb+srv://vijaynimar8:beRXwxugjfZHB6Qx@cluster0.ui0f9mj.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0")
        console.log("connected to database");
    }catch(err){
        console.log("error in connect to database");
    }
}
connectToDb()
const demoSchema=new Schema({
    email:String,
    password:String
})
const data=model("data",demoSchema)
app.post("/insertData",async(req,res)=>{
    const{email,password}=req.body
    try{
        let newData=new data({
            email,password
        })
        await newData.save()
        return res.status(201).json({message:"insert sucessfully"})
    }catch(err){
        return res.status(500).json({message:"error in insert data"})
    }
})
app.get("/getData",async(req,res)=>{
     try {
        const allData = await data.find();
        res.status(200).json(allData);
    } catch (err) {
        res.status(500).json({ message: "Error fetching data" });
    }
})
app.listen(2000,()=>{
    console.log("server started at port 2000");
})