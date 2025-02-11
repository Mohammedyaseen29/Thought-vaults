import React, { useEffect, useState } from 'react';
import { Check, Copy, Share2 } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import apiClient from '@/apiClient/apiClient';

export function ShareVault({ isOpen, onOpenChange, vaultId }:any) {
    const [link, setLink] = useState("https://thoughtVault.com/share/A12maeijfenv0");
    const [copy,setCopy] = useState(false);
    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(link);
            setCopy(true);
            setTimeout(()=>setCopy(false),1500)
        } catch (error) {
            console.log(error)
        }
    }
    async function fetchVaultShareableLink(){
        try {
            const response = await apiClient.post('/thought/share-vault',{vaultId});
            setLink(response.data.shareableLink);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(isOpen && vaultId){
            fetchVaultShareableLink();
        }
    },[isOpen,vaultId])

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-md bg-[#1D2235] text-white border-none"
            >
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <label htmlFor="link" className="sr-only">
                            Link
                        </label>
                        <Input
                            id="link"
                            value={link}
                            readOnly
                            className="text-black"
                        />
                    </div>
                    <button
                        className="p-3 rounded-lg bg-purple-700 hover:bg-purple-600"
                        onClick={handleCopy}
                    >
                        <span className="sr-only">Copy</span>
                        {copy ? (<Check className="w-5 h-5" />) : (<Copy className="w-5 h-5" />)}
                    </button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <button
                            className="px-4 py-2 rounded hover:scale-95 bg-purple-700"
                        >
                            Close
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}