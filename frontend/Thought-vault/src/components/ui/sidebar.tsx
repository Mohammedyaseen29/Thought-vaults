import {motion} from "framer-motion";
import { useState } from "react";
import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
import LogOut from "../models/LogOut";


export default function Sidebar() {
    const [isOpen,setOpen] = useState(false);
    const toggle = ()=>(setOpen((prev)=>!prev));
    const SidebarVariant = {
        open:{
            x:0,
            transition:{
                type:"spring",
                stiffness:300,
                damping:20,
            }
        },
        close:{
            x:"-100%",
            transition:{
                type:"spring",
                stiffness:300,
                damping:30,
            }
        }
    }

    return (
        <div>
            <motion.div
            initial='close'
            animate={isOpen ? "open" : "close"}
            variants={SidebarVariant}
            className="fixed top-0 left-0 z-50 w-64 bg-gray-800 text-white h-screen"
            >
                <div className="p-4 flex gap-x-4 justify-between items-center">
                    <h2 className="text-lg font-bold">Thaught Vault</h2>
                    <button onClick={toggle} className="hover:scale-95">{isOpen ? <GoSidebarCollapse className="w-8 h-8 text-white font-bold"/> : <GoSidebarExpand className="w-8 h-8 text-white font-bold"/>}</button>
                </div>
                <nav className="mt-4 px-4">
                    <LogOut/>
                </nav>
            </motion.div>
            <button hidden={isOpen} onClick={toggle} className="hover:scale-95 fixed z-50 top-4 left-4">{isOpen ? <GoSidebarCollapse className="w-10 h-10 text-white font-bold"/> : <GoSidebarExpand className="w-10 h-10 text-white font-bold"/>}</button>
        </div>
    )
}
