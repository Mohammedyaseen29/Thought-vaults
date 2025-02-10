// ui/sidebar.tsx
import { motion } from "framer-motion";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import LogOut from "../models/LogOut";

interface SidebarProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setOpen }: SidebarProps) {
    const toggle = () => setOpen(!isOpen);

    const SidebarVariant = {
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
            }
        },
        close: {
            x: "-100%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            }
        }
    };

    return (
        <>
            <motion.div
                initial="close"
                animate={isOpen ? "open" : "close"}
                variants={SidebarVariant}
                className={`fixed md:fixed top-0 left-0 z-50 w-64 bg-gray-800 text-white h-screen 
                            md:translate-x-0 md:z-30 shadow-lg`}
            >
                <div className="p-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold">Thought Vault</h2>
                    <button onClick={toggle} className="hover:scale-95">
                        {isOpen ? (
                            <GoSidebarCollapse className="w-8 h-8 text-white font-bold" />
                        ) : (
                            <GoSidebarExpand className="w-8 h-8 text-white font-bold" />
                        )}
                    </button>
                </div>
                <nav className="mt-4 px-4">
                    <LogOut />
                </nav>
            </motion.div>

            <button
                onClick={toggle}
                className={`fixed z-50 top-4 left-4 ${isOpen ? 'hidden' : 'block'}`}
            >
                <GoSidebarExpand className="w-10 h-10 text-white font-bold" />
            </button>
        </>
    );
}