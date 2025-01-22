import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {z} from "zod"
import { Content, User, Vault } from "./db";
import { jwt_secret } from "./config";
import { auth } from "./middleware";
import cors from "cors"

const app = express();


app.use(express.json());
app.use(cors());




app.post("/api/v1/signup",async(req,res)=>{
    try {
        const userSchema = z.object({
            name : z.string().min(3,"Name shoul be atleast 3 letter"),
            email:z.string().email("Invalid email"),
            password: z.string().min(8,"Password must be alteast 8 character").regex(/[a-z]/,"Password must contain at least one lowercase letter").regex(/[A-Z]/,"Password must contain at least one uppercase letter").regex(/\d/,"Password must contain at least one number").regex(/[\W_]/,"Password must contain at least one Special character")
        })
        const validatedData = userSchema.parse(req.body);
        const {name,email,password} = validatedData;
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({error:"User already Exist"});
            return;
        }
        const hashedPassword = await bcrypt.hash(password,5);
        await User.create({
            name,
            email,
            password:hashedPassword,
        })
        res.status(200).json({message:"User account created!"})
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ 
                error: "Validation failed",
                details: error.errors 
            });
            return;
        }
        res.status(500).json({"Error": error})
    }
})

app.post("/api/v1/signin",async(req,res)=>{
    try {
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            res.status(404).json({message:"Please create an account, user not exist!"});
            return;
        }
        const passwordMatch = await bcrypt.compare(password,existingUser?.password);
        if(!passwordMatch){
            res.status(400).json({message:"Incorrect password!"});
            return;
        }
        const token = jwt.sign({userId:existingUser?._id},jwt_secret,{expiresIn:'2d'});
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error})
    }
})

app.use(auth);


app.get("/api/v1/vaults",async(req,res)=>{
    try {
        const userId = req.userId;
        const vaults = await Vault.find({userId});
        res.status(200).json(vaults);
    } catch (error) {
        res.status(500).json({error})
    }
})
app.post("/api/v1/vaults",async(req,res)=>{
    try {
        const {name,description} = req.body;
        if(!name){
            res.status(400).json({message:"name is required"});
            return; 
        }
        const userId = req.userId;
        const newVault = await Vault.create({
            name,
            description,
            userId:userId
        })
        res.status(200).json(newVault);
    } catch (error) {
        res.status(500).json(error)
    }
})
app.put("/api/v1/vaults/:vaultId",async(req,res)=>{
    const {vaultId} = req.params;
    const userId = req.userId;
    const {name,description} = req.body;
    try {
        const vault = await Vault.findOne({_id:vaultId,userId});
        if(!vault){
            res.status(404).json({message:"Vault not found or not match!"});
            return;
        }
        if(name){
            vault.name = name;
        }
        if(description){
            vault.description = description;
        }
        await vault.save();
        res.status(200).json({message:"Vault updated successfully",vault})
    } catch (error) {
        res.status(500).json({error})
    }
})
app.delete("/api/v1/vaults/:vaultId",async(req,res)=>{
    const {vaultId} = req.params;
    const userId = req.userId;
    try {
        const vault = await Vault.findOne({_id:vaultId,userId});
        if(!vault){
            res.status(404).json({message:"vault not found"});
            return;
        }
        await vault.deleteOne();
        res.status(200).json({message:"vault deleted successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
})


app.get("/api/v1/vaults/:vaultId/content",async(req,res)=>{
    const {vaultId} = req.params;
    const userId = req.userId;

    try {
        const contents = await Content.find({userId,vaultId});
        if(!contents){
            res.status(404).json({message:"Contents not found"});
            return;
        }
        res.status(200).json(contents);
    } catch (error) {
        res.status(500).json(error)
    }

})

app.post("/api/v1/vaults/:vaultId/content",async(req,res)=>{
    const {name,link} = req.body;
    const {vaultId} = req.params;
    const userId = req.userId;
    try {
        const content = await Content.create({
            name,
            link,
            userId,
            vaultId
        })
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json(error)
    }
})
app.put("/api/v1/vaults/:vaultId/content/:contentId",(req,res)=>{
    const {name,link} = req.body;
    const userId = req.userId;
    const {vaultId,contentId} = req.params;
    
})

app.delete("/api/v1/vaults/:vaultId/content/:contentId",(req,res)=>{

})

app.get("/api/v1/thought/:shareLink",(req,res)=>{
    
})

app.post("/api/v1/thought/share",(req,res)=>{

})


app.listen(3000,()=>{
    console.log("Server is alive")
})