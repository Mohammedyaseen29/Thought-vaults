import React, { useState } from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Pencil, Share2, Trash2 } from "lucide-react";
import { ShareVault } from "./models/ShareVault";
import DeleteVault from "./models/DeleteVault";

const VerticalRounded = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
    const [isEdit,setisEdit] = useState(false);

    const handleShare = (e:React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false);
        setIsShareModalOpen(true);
    };
    const handleEdit = (e:React.MouseEvent<HTMLDivElement>)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false);
        setisEdit(true);
    }
    const handleDelete = (e:React.MouseEvent<HTMLDivElement>)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false);
        setIsDeleteModalOpen(true);
    }

    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger>
                    <BiDotsVerticalRounded className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#181b26] border-0">
                    <DropdownMenuItem
                        className="focus:bg-transparent active:bg-transparent hover:bg-transparent cursor-pointer"
                        onSelect={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div onClick={handleShare} className="w-full">
                            <div className="flex items-center group">
                                <Share2 className="w-5 h-5 text-white font-bold group-hover:text-purple-500 mr-2" />
                                <p className="font-bold text-white group-hover:text-purple-500">Share</p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-transparent active:bg-transparent hover:bg-transparent" onSelect={(e)=>e.preventDefault()}>
                        <div className="flex items-center group" onClick={handleEdit}>
                            <Pencil className="w-5 h-5 text-white font-bold group-hover:text-purple-500 mr-2" />
                            <p className="font-bold text-white group-hover:text-purple-500">Edit</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="focus:bg-transparent active:bg-transparent hover:bg-transparent"
                        onSelect={(e)=>e.preventDefault()}
                    >
                            <div className="flex items-center group" onClick={handleDelete}>
                                <Trash2 className="w-5 h-5 text-white font-bold group-hover:text-rose-500 mr-2" />
                                <p className="font-bold text-white group-hover:text-rose-500">Delete</p>
                            </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ShareVault
                isOpen={isShareModalOpen}
                onOpenChange={setIsShareModalOpen}
            />
            <DeleteVault
                isOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            />
        </>
    );
};

export default VerticalRounded;