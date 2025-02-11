    import { Check, Copy } from "lucide-react"

    import { Button } from "@/components/ui/button"
    import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"
    import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import apiClient from "@/apiClient/apiClient"


    export function Share() {
        const [open,setOpen] = useState(false);
        const [link, setLink] = useState("https://thoughtVault.com/share/A12maeijfenv0");
        const [clicked,setClicked] = useState(false);


        async function fetchShareableLink(){
            const response = await apiClient.post('/thought/share-page');
            setLink(response.data.shareableLink)
        }

        useEffect(()=>{
            if(open){
                fetchShareableLink();
            }
        },[open])

        async function handleCopy() {
            try {
                if(link){
                    await navigator.clipboard.writeText(link);
                    setClicked(true);
                    setTimeout(()=>setClicked(false),1500)
                }
            } catch (error) {
                console.log(error);
            }
        }
        
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button className="py-2 px-4 font-semibold hover:scale-95 rounded-md text-white bg-[#921EE2]">Share</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-[#1D2235] text-white border-none">
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
                        <button className="p-3 rounded-lg bg-purple-700" onClick={handleCopy}>
                            <span className="sr-only">Copy</span>
                            {clicked ? (<Check className="w-5 h-5" />) : (<Copy className="w-5 h-5" />)}
                        </button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <button className="px-4 py-2 rounded hover:scale-95 bg-purple-700">
                                Close
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
    }
