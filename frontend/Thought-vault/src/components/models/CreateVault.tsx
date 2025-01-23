import { CiCirclePlus } from "react-icons/ci";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/apiClient/apiClient";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function CreateVault() {
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();
    const vaultSchema = z.object({
        name: z.string().nonempty({message:"name is required"}).min(3, "name must be atleast 3 character"),
        description : z.string().optional()
    })
    type vaultField = z.infer<typeof vaultSchema>;
    const { register, formState: { errors, isSubmitting }, reset, handleSubmit } = useForm<vaultField>({resolver:zodResolver(vaultSchema)});


    const onSubmit:SubmitHandler<vaultField> = async(data)=>{
        try {
            console.log(data);
            const response = await apiClient.post('/vaults', data);
            console.log(response.data);
            reset();
            navigate(0);
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    }
    return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button className="bg-[#921EE2] font-semibold px-4 py-2 rounded-lg hover:scale-95 flex items-center text-sm sm:text-base">
                        Create Vault
                        <CiCirclePlus className="ml-2 w-4 h-4 font-semibold" />
                    </button>
                </DialogTrigger>
                <DialogContent className="bg-[#1D2235] border-none text-white">
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className="text-center text-white text-2xl">Create Vault</DialogTitle>
                        </DialogHeader>
                        <label htmlFor="Name" className="text-white">Name</label>
                        <Input placeholder="Enter the Name" className="ring-2 text-black mt-2" {...register("name")} />
                        {errors.name && <p className="text-rose-500 text-sm mt-1">{errors.name.message}</p>}
                        <label htmlFor="Description" className="text-white">Description</label>
                        <Input placeholder="Enter the Description" {...register("description")} className="ring-2 text-black mt-2" />
                        <DialogFooter>
                            <button disabled={isSubmitting} type="submit" className="px-4 py-2 mt-3 rounded hover:scale-95 text-white bg-purple-800">{isSubmitting ? "Submitting..." : "create"}</button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
    )
}
