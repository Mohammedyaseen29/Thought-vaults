import {SubmitHandler, useForm} from 'react-hook-form'
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '@/apiClient/apiClient'
import {toast, ToastContainer} from "react-toastify";

export default function SignIn() {
    const formSchema = z.object({
        email:z.string().email("Invalid Email"),
        password: z.string().min(8, "Password must be alteast 8 character").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/\d/, "Password must contain at least one number").regex(/[\W_]/, "Password must contain at least one Special character"),

    })
    const navigate = useNavigate();
    const notify = (msg:string)=>(toast(msg))
    type formField = z.infer<typeof formSchema>
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<formField>({resolver:zodResolver(formSchema)});
    const onSubmit:SubmitHandler<formField>= async(data)=>{
        try {
            const response = await apiClient.post('/signin',data);
            if(response.data){
                localStorage.setItem('token',response.data.token);
                notify("Successfully Signed In");
                navigate('/thoughts')
            }
        } catch (error) {
            notify("Sign in Failed!. Please check the credentials")
            console.log(error);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer/>
            <div className="bg-[#0B0C12] min-h-screen text-white flex items-center justify-center px-4">
                <div className="bg-[#1C2133] p-6 rounded-md w-full max-w-sm">
                    <h1 className="text-center font-semibold text-3xl">Sign in</h1>
                    <input
                        type="email"
                        placeholder="Enter the email"
                        className="p-2 rounded mt-4 w-full text-black outline-none"
                        {...register("email")}
                    />
                    <br />
                    {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
                    <input
                        type="password"
                        placeholder="Enter the Password"
                        className="p-2 rounded mt-4 w-full text-black outline-none"
                        {...register("password")}
                    />
                    <br />
                    {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
                    <div className="flex justify-center">
                        <button type="submit" disabled={isSubmitting} className="px-6 py-2 rounded bg-[#9820E3] mt-4 hover:scale-95 font-semibold">
                            {isSubmitting ? "Submitting..." : "Sign In"}
                        </button>
                    </div>
                    <p className="text-center mt-4">Have n't sign-up? <Link to='/sign-up'><span className="text-bold text-purple-500">Sign-up</span></Link></p>
                </div>
            </div>
        </form>
    );
}
