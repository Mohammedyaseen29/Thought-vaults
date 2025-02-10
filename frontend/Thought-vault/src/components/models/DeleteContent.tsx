import apiClient from "@/apiClient/apiClient";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useNavigate } from "react-router-dom";



export default function DeleteContent({ isOpen, onOpenChange, vaultId, contentId }:any) {
    const navigate = useNavigate();
    const handleDelete = async()=>{
        try {
            await apiClient.delete(`/vaults/${vaultId}/content/${contentId}`);
            navigate(0);
            onOpenChange(false);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#1D2235] border-none text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-white text-2xl">Delete Content</DialogTitle>
                    <DialogDescription className="text-center text-lg">Are You sure, You Wanna Delete</DialogDescription>
                </DialogHeader>
                <div className="flex mt-8 justify-between">
                    <DialogClose asChild>
                        <button className="px-4 py-2 bg-green-500 rounded hover:scale-95">Cancel</button>
                    </DialogClose>
                    <button className="bg-red-500 px-4 py-2 rounded hover:scale-95" onClick={handleDelete}>Delete</button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
