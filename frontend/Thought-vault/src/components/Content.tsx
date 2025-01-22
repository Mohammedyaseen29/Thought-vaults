
import { LuLink } from "react-icons/lu";





interface contentProps{
    title:string,
    link?:string,
    description?:string,
}

export default function Content({title,link,description}:contentProps) {
    
    return (
            <div className="bg-[#1D2235] rounded-2xl p-8 shadow ">
                <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
                <p className="overflow-hidden">{description}</p>
                <div className="mt-5">
                    <a href={link} target="_blank">
                        <button className="px-4 py-2 rounded hover:scale-95 bg-purple-700 gtext-white font-bold flex items-center">Click here <LuLink className="w-4 h-4 ml-3"/></button>
                    </a>
                </div>
            </div>
    )
}
