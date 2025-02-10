import { BiDotsVerticalRounded } from "react-icons/bi";
import { LuBrainCircuit } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import Content from "./Content";
import CreateContent from "./models/CreateContent";
import { Share } from "./models/Share";
import apiClient from "@/apiClient/apiClient";
import useFetch from "@/hooks/useFetch";





export default function Vault() {
    const {id} = useParams();
    async function fetchContent() {
        const response = await apiClient.get(`/vaults/${id}/content`);
        return response.data;
    }
    const {data,loading} = useFetch(fetchContent);
    return (
        <div className="bg-[#0B0C12] min-h-screen text-white p-4 sm:p-8">
            <div className="flex flex-wrap justify-between items-center space-y-2 sm:space-y-0">
                <div>
                    <Link to="/thoughts"><span className="text-sm font-bold hover:text-white text-slate-500 mr-1">Vaults</span></Link>
                    <span className="text-sm font-bold hover:text-white text-slate-500 mr-1">/</span> 
                    <span className="text-sm font-bold hover:text-white text-slate-500 cursor-pointer">Contents</span>
                </div>
                <div className="flex items-center">
                    <Share/>
                    <BiDotsVerticalRounded className="w-8 h-8 text-white cursor-pointer" />
                </div>
            </div>
            <div className="mt-16 flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-2">
                    <h3 className="text-white font-semibold text-xl sm:text-2xl">My Contents</h3>
                    <LuBrainCircuit className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 font-semibold" />
                </div>
                <CreateContent VaultId={id}/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                {loading ? (<p className="font-bold text-center animate-pulse text-gray-500">Loading...</p>):
                    data && data.length > 0 ? (data.map((c:any)=>(
                        <Content key={c._id} id={c._id} title={c.title} link={c.link}/>
                    ))) : (<p className="text-center font-bold text-purple-500 text-2xl">Please create Contents!</p>)
                }
            </div>
        </div>
    )
}
