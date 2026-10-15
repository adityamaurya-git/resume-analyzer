import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Login = () =>{

    const {loading, handleLogin} = useAuth();

    const navigate = useNavigate();

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = {
            email,
            password
        }
        
        const response = await handleLogin(formData);
        console.log(response);
        navigate('/');
    }

    if(loading){
        return(<>
            <h1>Loading...</h1>
        </>)
    }

    return(<>
        <main className=" w-full h-screen flex justify-center items-center bg-zinc-950 text-text-primary">
            <div className="formContainer w-1/3 h-2/3 flex flex-col gap-2 p-4 border-2 rounded-lg border-zinc-600 ">
                <h1 className="text-2xl font-extrabold" >Login</h1>
                <form onSubmit={handleSubmit}>

                    <div className="inputBox flex flex-col p-2 gap-1">
                        <label htmlFor="email"> Email </label>
                        <input 
                            className="border-2 border-zinc-600 rounded-lg p-2" 
                            type="email" 
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
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
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>

                    <div className="inputBox flex flex-col p-2 gap-1">
                        <input 
                            className=" bg-brand-primary text-text-primary rounded-lg p-2 font-semibold cursor-pointer active:scale-105 hover:bg-text-primary hover:text-brand-primary transition-all" 
                            type="submit" 
                        />
                    </div>

                </form>
                <p>Don't have an Account? <Link className="text-brand-primary" to='/register' >Register</Link> </p>
            </div>
        </main>
    </>)
}