import mongoose, { Types } from "mongoose";


mongoose.connect("mongodb+srv://yaseen17861786:yaseen1786@cluster0.1b8ul.mongodb.net/Thought-vault");


const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email: {type:String,required:true,unique:true},
    password : {type:String,required:true}
})


export const User = mongoose.model("User",userSchema);


const vaultSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    userId:{type:Types.ObjectId,ref:"User",required:true},
    contents:[{type:Types.ObjectId,ref:"Content"}]
})
export const Vault = mongoose.model("Vault",vaultSchema);

const contentSchema = new mongoose.Schema({
    title:{type:String,required:true},
    link: { type: String, required: true },  
    userId:{type:Types.ObjectId,ref:'User',required:true},
    vaultId:{type:Types.ObjectId,ref:"Vault",required:true}
})

export const    Content = mongoose.model("Content",contentSchema);

const linkSchema = new mongoose.Schema({
    hash : {type:String,required:true,unique:true},
    resourceId:{type:Types.ObjectId,ref:"Vault"},
    isPageLink:{type:Boolean,default:false},
    userId:{type:Types.ObjectId,ref:"User",required:true},
})

export const Link = mongoose.model("Link",linkSchema);