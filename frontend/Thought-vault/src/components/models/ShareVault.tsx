import React from 'react';
import { Copy, Share2 } from "lucide-react";
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

export function ShareVault({ isOpen, onOpenChange }:any) {
    const handleClose = () => {
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-md bg-[#1D2235] text-white border-none"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
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
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                            className="text-black"
                        />
                    </div>
                    <button
                        className="p-3 rounded-lg bg-purple-700 hover:bg-purple-600"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="sr-only">Copy</span>
                        <Copy className="w-5 h-5" />
                    </button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <button
                            className="px-4 py-2 rounded hover:scale-95 bg-purple-700"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}