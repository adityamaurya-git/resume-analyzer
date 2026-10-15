import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";


export const ProtectedRoutes = ({children}) => {
    const { loading, user } = useAuth();

    // console.log(user);

    if(loading){
        return(<>
            <h1>Loading....</h1>
        </>)
    }

    if(!user){
        return <Navigate to="/login" />
    }

    return children;
}