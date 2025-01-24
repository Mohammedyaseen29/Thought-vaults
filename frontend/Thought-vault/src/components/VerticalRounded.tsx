import { BiDotsVerticalRounded } from "react-icons/bi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Pencil, Share2, Trash2 } from "lucide-react";
import { ShareVault } from "./models/ShareVault";
import DeleteVault from "./models/DeleteVault";

export default function VerticalRounded() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <BiDotsVerticalRounded className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#181b26] border-0">
                <DropdownMenuItem className="focus:bg-transparent active:bg-transparent hover:bg-transparent">
                    <ShareVault/>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-transparent active:bg-transparent hover:bg-transparent">
                    <div className="flex items-center group">
                        <Pencil className="w-5 h-5 text-white font-bold group-hover:text-purple-500 mr-2" />
                        <p className="font-bold text-white group-hover:text-purple-500">Edit</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-transparent active:bg-transparent hover:bg-transparent">
                    <DeleteVault/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
