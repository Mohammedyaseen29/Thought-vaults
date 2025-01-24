import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Trash2 } from "lucide-react";


export default function DeleteVault() {
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="group">
                    <div className="flex items-center group">
                        <Trash2 className="w-5 h-5 text-white font-bold group-hover:text-rose-500 mr-2" />
                        <p className="font-bold text-white group-hover:text-rose-500">Delete</p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-[#1D2235] border-none text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-white text-2xl">Log Out</DialogTitle>
                    <DialogDescription className="text-center text-lg">Are You sure, You Wanna Log Out</DialogDescription>
                </DialogHeader>
                <div className="flex mt-8 justify-between">
                    <DialogClose asChild>
                        <button className="px-4 py-2 bg-green-500 rounded hover:scale-95">Cancel</button>
                    </DialogClose>
                    <button className="bg-red-500 px-4 py-2 rounded hover:scale-95">Log Out</button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
