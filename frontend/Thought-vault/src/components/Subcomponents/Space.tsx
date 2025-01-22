import { BiDotsVerticalRounded } from "react-icons/bi";
import { LuBrainCircuit } from "react-icons/lu";
import VaultCard from "./VaultCard";
import CreateVault from "../models/CreateVault";
import { Share } from "../models/Share";
import apiClient from "@/apiClient/apiClient";

export default function Space() {
    const fetchVault = async () => {
        const response = await apiClient.get('/vaults');
        return response.data
    } 
    return (
        <div className="p-4 sm:p-8 w-full">
            <div className="flex flex-wrap justify-end items-center space-y-2 sm:space-y-0">
                <Share/>
                <BiDotsVerticalRounded className="w-8 h-8 text-white cursor-pointer" />
            </div>

            <div className="mt-5">
                <h1 className="text-white font-bold text-3xl sm:text-4xl">Hello Yaseen!👋</h1>
                <p className="text-sm text-slate-400 mt-1">Here is your list of vaults!</p>
            </div>

            <div className="mt-16 flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-2">
                    <h3 className="text-white font-semibold text-xl sm:text-2xl">My Vaults</h3>
                    <LuBrainCircuit className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 font-semibold" />
                </div>
                <CreateVault/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                <VaultCard title="Education" />
                <VaultCard title="Sports" />
                <VaultCard title="Politics" />
                <VaultCard title="Entertainment"/>
            </div>
        </div>
    );
}
