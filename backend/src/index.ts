import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {z} from "zod"
import { Content, Link, User, Vault } from "./db";
import { jwt_secret } from "./config";
import { auth } from "./middleware";
import cors from "cors"
import crypto from "crypto";

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
        const token = jwt.sign({userId:existingUser?._id},jwt_secret);
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
        console.error("Error fetching vaults:", error);
        res.status(500).json({ message: "Internal Server Error" });
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
            userId,
        })
        res.status(201).json(newVault);
    } catch (error) {
        console.error("Error creating vault:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/api/v1/vaults/:vaultId",async(req,res)=>{
    const {vaultId} = req.params;
    const userId = req.userId;
    try {
        if(!vaultId){
            res.status(400).json({message:"Vault id is required!"});
            return;
        }
        const vault = await Vault.find({_id:vaultId,userId});
        res.status(200).json(vault);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.patch("/api/v1/vaults/:vaultId",async(req,res)=>{
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
    const {title,link} = req.body;
    const {vaultId} = req.params;
    const userId = req.userId;
    try {
        const content = await Content.create({
            title,
            link,
            userId,
            vaultId
        })
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get("/api/v1/vaults/:vaultId/content/:contentId",async(req,res)=>{
    try {
        const {vaultId,contentId} = req.params;
        const userId = req.userId;
        const content = await Content.findOne({_id:contentId,userId,vaultId});
        if(!content){
            res.status(404).json({message:"Content not found!"})
            return;
        }
        res.status(200).json(content);
    } catch (error) {
        console.log(error);
    }
})

app.patch("/api/v1/vaults/:vaultId/content/:contentId",async(req,res)=>{
    try {
        const { title, link } = req.body;
        const userId = req.userId;
        const { vaultId, contentId } = req.params;
        if(!vaultId){
            res.status(400).json({message:"VaultId is required"})
            return;
        }
        if(!contentId){
            res.status(400).json({message:"contentId is required"})
        }
        const content = await Content.findOne({_id:contentId,userId,vaultId});
        if(!content){
            res.status(404).json({message:"Content not found!"});
            return;
        }
        if(title){
            content.title = title;
        }
        if(link){
            content.link = link;
        }
        await content.save();
        res.status(200).json({message:"Content updated"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"})
    }
})

app.delete("/api/v1/vaults/:vaultId/content/:contentId",async(req,res)=>{
    try {
        const {vaultId,contentId} = req.params;
        const userId = req.userId;
        if(!vaultId){
            res.status(400).json({message:"VaultId is required"});
            return;
        }
        if(!contentId){
            res.status(400).json({ message: "ContentId is required" });
            return;
        }
        const content = await Content.findOne({_id:contentId,userId,vaultId})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
        
    }
})

app.post("/api/v1/thought/share-vault",async(req,res)=>{
    try {
        const {vaultId} = req.body;
        const userId = req.userId;

        if(!vaultId){
            res.status(400).json({message:"VauldId is required!"});
            return;
        }
        const vault = await Vault.findOne({_id:vaultId,userId});
        if(!vault){
            res.status(404).json({message:"Vault is not found"});
            return;
        }
        const existingLink = await Link.findOne({userId,resourceId:vaultId,isPageLink:false})
        if(existingLink){
            res.status(200).json({
                message:"Sharing link for the vault already Exist!",
                shareableLink:`${req.protocol}://${req.get("host")}/api/v1/thought/${existingLink.hash}`
            })
            return;
        }
        const hash = crypto.randomBytes(16).toString("hex");

        const link = await Link.create({
            hash,
            userId,
            resourceId:vaultId
        })
        const shareableLink = `${req.protocol}://${req.get("host")}/api/v1/thought/${hash}`

        res.status(201).json({message:"Vault Shareable link is Created Successfully",shareableLink})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error!"})
    }
})

app.post("api/v1/thought/share-page",async(req,res)=>{
    try {
        const userId = req.userId;
        const existingLink = await Link.findOne({userId,isPageLink:true});
        if(existingLink){
            res.status(200).json({
                message:"Page link is already exist!",
                shareableLink:`${req.protocol}://${req.get("host")}/api/v1/thought/${existingLink.hash}`
            })
            return;
        }
        const hash = crypto.randomBytes(16).toString("hex");
        const link = await Link.create({
            userId,
            hash,
            isPageLink:true,
        })
        const shareableLink = `${req.protocol}://${req.get("host")}/api/v1/thought/${hash}`
        res.status(201).json({message:"Shareable link for this page is created!",shareableLink})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server Error"})
    }
})




app.get("/api/v1/thought/:hash",async(req,res)=>{
    try {
        const {hash} = req.params;
        const link = await Link.findOne({hash});
        if(!link){
            res.status(404).json({message:"Link not found"});
            return;
        }
        if(link?.isPageLink){
            const vault = await Vault.find({userId:link.userId})
            res.status(200).json({userId:link.userId,vault});
        }
        else{
            const vault = await Vault.findById(link?.resourceId);
            if(!vault){
                res.status(400).json({message:"Vault not found"});
                return;
            }
            res.status(200).json(vault);
        }
    } catch (error) {
        console.log(error);
        res.status(500)
    }
})



app.listen(3000,()=>{
    console.log("Server is alive")
})