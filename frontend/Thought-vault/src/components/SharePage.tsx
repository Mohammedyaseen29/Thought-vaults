import apiClient from "@/apiClient/apiClient";
import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom"
import VaultCard from "./Subcomponents/VaultCard";

interface contentData{
    _id :string;
    title:string;
    link:string;
}


interface vaultData{
    _id : string;
    name:string;
    description?:string;
    contents:contentData[];
}

export default function SharePage() {
    const {hash} = useParams();
    async function fetchSharedData() {
        const response = await apiClient.get(`/thought/${hash}`)
        const data = response.data
        return Array.isArray(data) ? data : [data]; 
    }
    const {data,loading} = useFetch<vaultData[]>(fetchSharedData);
    return (
        <div className="bg-[#0B0C12] min-h-screen text-white py-8 px-10">
            <div className="mt-5 cursor-pointer">
                <h1 className="text-white font-bold text-3xl sm:text-4xl">Shared Vaults!🎈</h1>
                <p className="text-sm text-slate-400 mt-1">Here is your list of vaults!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                {loading ? (<p className="font-bold text-center text-2xl text-gray-500 animate-pulse">Loading...</p>) :
                    (data && data.length > 0 ? (data.map((vault) => (
                        <VaultCard key={vault._id} type="share" id={vault._id} title={vault.name} description={vault.description} contents={vault.contents} />
                    ))) : (
                        <p className="text-center font-bold text-2xl text-purple-500">
                            There is no Vault.
                        </p>
                    ))
                }
            </div>
        </div>
    )
}
