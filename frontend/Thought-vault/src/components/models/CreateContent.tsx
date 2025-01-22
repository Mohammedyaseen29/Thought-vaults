import { CiCirclePlus } from "react-icons/ci";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { title } from "process";
import { zodResolver } from "@hookform/resolvers/zod";



export default function CreateContent() {
    const contentSchema = z.object({
        title : z.string().nonempty({message:"Title is required"}).min(3,"Title must atleast be 3 characters"),
        description : z.string().optional(),
        link: z.string().nonempty({message:"Link is required"})
    })
    type contentField = z.infer<typeof contentSchema>;
    const {register,formState:{errors,isSubmitting},reset,handleSubmit} = useForm<contentField>({resolver:zodResolver(contentSchema)});
    const onSubmit:SubmitHandler<contentField> = async(data)=>{
        console.log(data);
        reset();
    }
    return (
        <Dialog>
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
                    <label htmlFor="Description" className="text-white">Description</label>
                    <Input placeholder="Enter the Description" className="ring-2" />
                    <label htmlFor="Description" className="text-white">Link</label>
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
