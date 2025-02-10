import Space from "./Subcomponents/Space";
import Sidebar from "./ui/sidebar";
import { useState } from "react";

export default function Thoughts() {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="bg-[#0B0C12] min-h-screen flex text-white">
            <Sidebar isOpen={isOpen} setOpen={setOpen} />
            <div className="md:ml-64 w-full">
                <Space />
            </div>
        </div>
    );
}