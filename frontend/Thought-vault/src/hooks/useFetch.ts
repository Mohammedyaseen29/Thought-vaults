import { useEffect, useState } from "react";


export default function useFetch<T>(fn:()=>Promise<T>){
    const [data,setData] = useState<T | null>(null);
    const [loading,setLoading] = useState(false);
    const fetchData = async ()=>{
        try {
            setLoading(true);
            const data = await fn();
            setData(data);
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
    return {data,loading};
}