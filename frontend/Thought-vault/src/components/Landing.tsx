import {Link, useNavigate} from "react-router-dom"
import { TfiThought } from "react-icons/tfi";
import { useEffect } from "react";

export default function Landing() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            navigate('/thoughts')
        }
    }, []);
    return (
        <div className="min-h-screen bg-[#0D1117] text-white">
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <TfiThought className="w-8 h-8 font-bold text-purple-800" />
                    <span className="text-lg font-bold">Thought Vault</span>
                </div>
                <nav className="flex items-center gap-6">
                    
                </nav>
            </header>

            <main className="container mx-auto px-4 pt-24 pb-16 text-center">
                <h1 className="text-5xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight mb-6">
                    Your Digital Vaultt{" "}
                    <span className="block">for Everything Important</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                    Thought Vault is your personal library for links, notes, and ideas. Save what matters, find it when you need it, and keep your thoughts organized—all in one place.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/sign-up">
                        <button
                            className="bg-purple-500 hover:scale-95 hover:bg-purple-600 px-4 py-2 rounded-full font-semibold text-white min-w-[200px]"
                        >
                            Start Organizing Now
                        </button>
                    </Link>
                    <Link to='/sign-in'>
                        <button
                            className="text-purple-500 hover:scale-95 font-bold  px-4 py-2 rounded-full outline outline-purple-600 bg-white hover:text-purple-600 min-w-[200px]"
                        >
                            Sign-In
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    )
    }
