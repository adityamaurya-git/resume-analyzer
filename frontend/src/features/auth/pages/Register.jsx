import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../services/auth.api";
import { useAuth } from '../hooks/useAuth';

export const Register = () => {

    const navigate = useNavigate();
    const {loading, handleRegister } = useAuth();

    const [formData , setFormData] = useState({
        username:"",
        email:"",
        password:"",
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const response = await handleRegister(formData);
            console.log(response);
            navigate('/login');
        }catch(err){
            console.log(err);
        }

    }

    if(loading){
        return(<>
            <h1>Loading...</h1>
        </>)
    }

    return (<>
        <main className=" w-full h-screen flex justify-center items-center bg-zinc-950 text-text-primary">
            <div className="formContainer w-1/3 h-2/3 flex flex-col gap-2 p-4 border-2 rounded-lg border-zinc-600 ">
                <h1 className="text-2xl font-extrabold" >Register</h1>
                <form onSubmit={handleSubmit}>

                    <div className="inputBox flex flex-col p-2 gap-1">
                        <label htmlFor="email"> Username </label>
                        <input
                            className="border-2 border-zinc-600 rounded-lg p-2"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your Username"
                            value={formData.username}
                            onChange={(e) => {setFormData((prev) =>({
                                ...prev,
                                username: e.target.value
                            }))}}
                        />
                    </div>

                    <div className="inputBox flex flex-col p-2 gap-1">
                        <label htmlFor="email"> Email </label>
                        <input
                            className="border-2 border-zinc-600 rounded-lg p-2"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => {setFormData((prev) => ({
                                ...prev,
                                email: e.target.value
                            }))}}
                        />
                    </div>

                    <div className="inputBox flex flex-col p-2 gap-1">
                        <label htmlFor="password"> Password </label>
                        <input
                            className="border-2 border-zinc-600 rounded-lg p-2"
                            type="text"
                            id="password"
                            name="password"
                            placeholder="Enter your Password"
                            value={formData.password}
                            onChange={(e) =>{
                                setFormData((prev) =>({
                                    ...prev,
                                    password: e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className="inputBox flex flex-col p-2 gap-1">
                        <input
                            className=" bg-brand-primary text-text-primary rounded-lg p-2 font-semibold cursor-pointer active:scale-105 hover:bg-text-primary hover:text-brand-primary"
                            type="submit"
                        />
                    </div>

                </form>
                <p>Already have an Account? <Link className="text-brand-primary" to='/login' >Login</Link> </p>
            </div>
        </main>
    </>)
}