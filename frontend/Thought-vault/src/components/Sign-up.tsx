import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import {Link, useNavigate} from "react-router-dom"
import apiClient from "@/apiClient/apiClient";
import {toast,ToastContainer} from "react-toastify";
export default function SignUp() {
    
    const signUpSchema = z.object({
        name:z.string().min(3,"Name must be atleast 3 character"),
        email : z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be alteast 8 character").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/\d/, "Password must contain at least one number").regex(/[\W_]/, "Password must contain at least one Special character")
    })
    const navigate = useNavigate();
    type SignUpField = z.infer<typeof signUpSchema>;
    const notify = (msg:string)=>(
        toast(msg)
    )
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<SignUpField>({resolver:zodResolver(signUpSchema)});

    const onSubmit:SubmitHandler<SignUpField> = async(data)=>{
        try {
            const response = await apiClient.post('/signup',data);
            if(response.data){
                notify(response.data.message);
                navigate('/sign-in');
            }
        } catch (error) {
            notify("Something went wrong!. try again");
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer/>
            <div className="bg-[#0B0C12] min-h-screen text-white flex items-center justify-center px-4">
                <div className="bg-[#1C2133] p-6 rounded-md w-full max-w-sm">
                    <h1 className="text-center font-semibold text-3xl">Sign Up</h1>
                    <input type="text" placeholder="Enter the Your name" className="p-2 rounded mt-4 w-full text-black outline-none" {...register("name")}/>
                    <br />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    <input
                        type="email"
                        placeholder="Enter the email"
                        className="p-2 rounded mt-4 w-full text-black outline-none"
                        {...register("email")}
                    />
                    <br />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    <input
                        type="password"
                        placeholder="Enter the Password"
                        className="p-2 rounded mt-4 w-full text-black outline-none"
                        {...register("password")}
                    />
                    <br />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    <div className="flex justify-center">
                        <button disabled={isSubmitting} type="submit" className="px-6 py-2 rounded bg-[#9820E3] mt-4 hover:scale-95 font-semibold">
                            {isSubmitting ? "submiting..." : "Sign Up"}
                        </button>
                    </div>
                    <p className="text-center mt-4">Already Signed up? <Link to='/sign-in'><span className="text-bold text-purple-500">Sign-in</span></Link></p>
                </div>
            </div>
        </form>
    );
}
