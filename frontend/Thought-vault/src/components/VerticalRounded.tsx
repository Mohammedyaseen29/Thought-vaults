import React, { useState } from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Pencil, Share2, Trash2 } from "lucide-react";
import { ShareVault } from "./models/ShareVault";
import DeleteVault from "./models/DeleteVault";
import EditVault from './models/EditVault';
import EditContent from './models/EditContent';
import DeleteContent from './models/DeleteContent';

interface VerticalRoundedProps{
    id:string,
    type: "vault" | "content",
    vaultId?:string
}

const VerticalRounded = ({id,type,vaultId}:VerticalRoundedProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
    const [isEdit,setisEdit] = useState(false);
    const [isEditContentModal,setEditContentModal] = useState(false);
    const [isDeleteContentModal,setDeleteContentModal] = useState(false);

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
        type === 'vault' ? setisEdit(true) : setEditContentModal(true)
    }
    const handleDelete = (e:React.MouseEvent<HTMLDivElement>)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false);
        type === "vault" ? setIsDeleteModalOpen(true) : setDeleteContentModal(true);
    }

    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger>
                    <BiDotsVerticalRounded className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#181b26] border-0">
                    {type === "vault" && (
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
                    )}
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
                vaultId = {id}
                isOpen={isShareModalOpen}
                onOpenChange={setIsShareModalOpen}
            />
            <EditVault
                vaultId = {id}
                isOpen = {isEdit}
                onOpenChange = {setisEdit}
            />
            <DeleteVault
                vaultId = {id}
                isOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            />
            <EditContent
                vaultId={vaultId}
                contentId={id}
                isOpen={isEditContentModal}
                onOpenChange={setEditContentModal}
            />
            <DeleteContent
                vaultId={vaultId}
                contentId={id}
                isOpen = {isDeleteContentModal}
                onOpenChange = {setDeleteContentModal}
            />
        </>
    );
};

export default VerticalRounded;