import { CiCirclePlus } from "react-icons/ci";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/apiClient/apiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function CreateContent({VaultId}:any) {
    const [isOpen,setIsOpen] = useState(false);
    const navigate = useNavigate();
    const contentSchema = z.object({
        title : z.string().nonempty({message:"Title is required"}).min(3,"Title must atleast be 3 characters"),
        link: z.string().nonempty({message:"Link is required"})
    })
    type contentField = z.infer<typeof contentSchema>;
    const {register,formState:{errors,isSubmitting},reset,handleSubmit} = useForm<contentField>({resolver:zodResolver(contentSchema)});
    const onSubmit:SubmitHandler<contentField> = async(data)=>{
        console.log(data);
        try {
            const response = await apiClient.post(`/vaults/${VaultId}/content`,data);
            console.log(response.data);
            reset();
            setIsOpen(false);
            navigate(1);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="bg-[#921EE2] font-semibold px-4 py-2 rounded-lg hover:scale-95 flex items-center text-sm sm:text-base">
                    Create Content
                    <CiCirclePlus className="ml-2 w-4 h-4 font-semibold" />
                </button>
            </DialogTrigger>
            <DialogContent className="bg-[#1D2235] border-none text-black">
                <DialogHeader>
                    <DialogTitle className="text-center text-white text-2xl">Create Content</DialogTitle>
                </DialogHeader>
                <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <label htmlFor="Title" className="text-white">Title</label>
                    <Input placeholder="Enter the title" className="ring-2" {...register("title",{required:"Title is required"})}/>
                    {errors.title && <p className="text-rose-500 mt-2 text-sm">{errors.title.message}</p>}
                    <label htmlFor="Link" className="text-white">Link</label>
                    <Input placeholder="Enter the link" className="ring-2" {...register("link", { required: "Link is required" })} />
                    {errors.link && <p className="text-rose-500 text-sm mt-2">{errors.link.message}</p>}
                    <DialogFooter>
                        <button disabled={isSubmitting} type="submit" className="px-4 py-2 rounded hover:scale-95 text-white bg-purple-800">{isSubmitting ? "Submitting..." :  "create"}</button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
