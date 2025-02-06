import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Trash2 } from "lucide-react";


export default function DeleteVault({isOpen,onOpenChange}:any) {
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#1D2235] border-none text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-white text-2xl">Delete Vault</DialogTitle>
                    <DialogDescription className="text-center text-lg">Are You sure, You Wanna Delete</DialogDescription>
                </DialogHeader>
                <div className="flex mt-8 justify-between">
                    <DialogClose asChild>
                        <button className="px-4 py-2 bg-green-500 rounded hover:scale-95">Cancel</button>
                    </DialogClose>
                    <button className="bg-red-500 px-4 py-2 rounded hover:scale-95">Delete</button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
