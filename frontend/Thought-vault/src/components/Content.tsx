
import { LuLink } from "react-icons/lu";
import VerticalRounded from "./VerticalRounded";





interface contentProps{
    title:string,
    link:string,
    id:string,
    vaultId:any,
}

export default function Content({title,link,id,vaultId}:contentProps) {
    
    return (
            <div className="bg-[#1D2235] rounded-2xl p-8 shadow relative">
                <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
                <div className="mt-5">
                    <a href={link} target="_blank">
                        <button className="px-4 py-2 rounded hover:scale-95 bg-purple-700 gtext-white font-bold flex items-center">Click here <LuLink className="w-4 h-4 ml-3"/></button>
                    </a>
                </div>
                <div className="absolute top-2 right-0">
                    <VerticalRounded vaultId={vaultId} id={id} type="content"/>
                </div>
            </div>
    )
}
