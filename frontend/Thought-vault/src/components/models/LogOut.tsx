import { CiLogout } from "react-icons/ci";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useNavigate } from "react-router-dom";


export default function LogOut() {
    const navigate = useNavigate();
    const handleLogOut = ()=>{
        localStorage.removeItem("token");
        navigate('/sign-in');
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="group">
                    <button className="flex group-hover:text-red-500 w-full p-2 hover:bg-gray-600 items-center font-semibold">Log out<CiLogout className="ml-2 w-5 h-5 font-bold text-white group-hover:text-red-500" /></button>
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
                    <button onClick={handleLogOut} className="bg-red-500 px-4 py-2 rounded hover:scale-95">Log Out</button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
