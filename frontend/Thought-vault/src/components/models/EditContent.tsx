
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/apiClient/apiClient";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function EditContent({isOpen,onOpenChange,vaultId,contentId}:any) {
    const navigate = useNavigate();
    const vaultSchema = z.object({
        title: z.string().nonempty({message:"title is required"}).min(3, "title must be atleast 3 character"),
        link: z.string().nonempty({ message: "Link is required" })
    })
    type vaultField = z.infer<typeof vaultSchema>;
    const { register, formState: { errors, isSubmitting }, handleSubmit,setValue} = useForm<vaultField>({resolver:zodResolver(vaultSchema)});

    async function fetchUpdatedVault() {
        try {
            const response = await apiClient.get(`/vaults/${vaultId}/content/${contentId}`);
            const data = response.data;
            const {title,link} = data;
            setValue("title",title);
            setValue("link",link);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(isOpen && contentId){
            fetchUpdatedVault();
        }

    },[contentId,isOpen])

    const onSubmit:SubmitHandler<vaultField> = async(data)=>{
        try {
            console.log(data);
            await apiClient.patch(`/vaults/${vaultId}/content/${contentId}`,data);
            onOpenChange(false);
            navigate(0);
            toast.success("vault updated successfully!");
        } catch (error) {
            console.log(error);
            toast.error("something went wrong!")
        }
    }
    return (
            <>
                <ToastContainer/>
                <Dialog open={isOpen} onOpenChange={onOpenChange}>
                    <DialogContent className="bg-[#1D2235] border-none text-white">
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <DialogHeader>
                                <DialogTitle className="text-center text-white text-2xl">Edit Content</DialogTitle>
                            </DialogHeader>
                            <label htmlFor="Name" className="text-white">Title</label>
                            <Input placeholder="Enter the Name" className="ring-2 text-black mt-2" {...register("title")} />
                            {errors.title && <p className="text-rose-500 text-sm mt-1">{errors.title.message}</p>}
                            <label htmlFor="Description" className="text-white">Link</label>
                            <Input placeholder="Enter the Description" {...register("link")} className="ring-2 text-black mt-2" />
                            <DialogFooter>
                                <button disabled={isSubmitting} type="submit" className="px-4 py-2 mt-3 rounded hover:scale-95 text-white bg-purple-800">{isSubmitting ? "Updating..." : "update"}</button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </>
    )
}
