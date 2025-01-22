import { CiCirclePlus } from "react-icons/ci";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



export default function CreateVault() {

    const vaultSchema = z.object({
        title: z.string().nonempty({message:"Title is required"}).min(3, "Title must be atleast 3 character"),
        description : z.string().optional()
    })
    type vaultField = z.infer<typeof vaultSchema>;
    const { register, formState: { errors, isSubmitting }, reset, handleSubmit } = useForm<vaultField>({resolver:zodResolver(vaultSchema)});


    const onSubmit:SubmitHandler<vaultField> = async(data)=>{
        console.log(data); 
        reset();
    }
    return (
        <Dialog>
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
                    <label htmlFor="Title" className="text-white">Title</label>
                    <Input placeholder="Enter the title" className="ring-2 text-black mt-2" {...register("title")} />
                    {errors.title && <p className="text-rose-500 text-sm mt-1">{errors.title.message}</p>}
                    <label htmlFor="Description" className="text-white" {...register("description")}>Description</label>
                    <Input placeholder="Enter the Description" className="ring-2 text-black mt-2" />
                    <DialogFooter>
                        <button disabled={isSubmitting} type="submit" className="px-4 py-2 mt-3 rounded hover:scale-95 text-white bg-purple-800">{isSubmitting ? "Submitting..." : "create"}</button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
