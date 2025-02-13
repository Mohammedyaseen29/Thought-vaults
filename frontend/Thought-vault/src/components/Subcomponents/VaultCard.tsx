
import { useNavigate } from "react-router-dom";
import VerticalRounded from "../VerticalRounded";

interface VaultCardProps {
    id:string
    title: string;
    description?: string;
    type:"vault" | "share";
    contents?: {
        _id : string;
        title:string;
        link:string;
    }[]
}

export default function VaultCard({id,type, title, description,contents}: VaultCardProps) {
    const navigate = useNavigate();
    function handleClick(){
        if(type === "vault"){
            navigate(`/vault/${id}`);
        }
        else{
            navigate(`/vault/share/${id}`,{state:{contents}})
        }
    }
    return (
        <div onClick={handleClick}>
            <div className="relative p-6 sm:p-8 bg-[#1D2235] mt-2 rounded-2xl shadow hover:scale-95 transition">
                <div className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 rounded-tl-xl rounded-br-xl bg-green-500 flex items-center justify-center text-xl sm:text-2xl font-bold">
                    {title.charAt(0).toUpperCase()}
                </div>
                <div className="absolute top-1 right-1 flex justify-end cursor-pointer" onClick={(e)=>e.stopPropagation()}>
                    {type === "vault" && (<VerticalRounded id={id} type="vault" />)}
                </div>
                <h1 className="font-bold text-center text-lg sm:text-xl md:text-2xl text-white">{title}</h1>
                <p className="text-sm sm:text-base text-slate-400 mt-2">{description}</p>
            </div>
        </div>
    );
}    
