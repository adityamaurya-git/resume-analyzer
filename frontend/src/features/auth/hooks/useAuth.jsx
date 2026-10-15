import { useContext, useEffect } from "react"
import { AuthContext } from "../context/auth.context"
import { getUser, loginUser, logoutUser, registerUser } from "../services/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext);
    const {user, setUser, loading, setLoading} = context;

    const handleRegister = async ({username, email, password}) => {
        setLoading(true);

        try{
            const data = await registerUser({username, email, password});
            setUser(data.user);
            return data;
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const handleLogin = async ({email , password}) => {
        setLoading(true);

        try{
            const data = await loginUser({email , password});
            setUser(data.user);
            return data;
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);

        try{
            const response = await logoutUser();
            setUser(null);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }


    useEffect(() => {

        const getAndSetUser = async () => {
            try{
                const data = await getUser();
                setUser(data.user);
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
            }
            // console.log(data);
        }

        getAndSetUser();
    },[])

    return {user, loading, handleRegister, handleLogin, handleLogout}
}