import { Route, Routes } from "react-router-dom"
import { Register } from "../features/auth/pages/Register"
import { Home } from "../pages/Home"
import { Login } from "../features/auth/pages/Login"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { InterviewReport } from "../pages/InterviewReport"

export const MainRoutes = () =>{
    return(<>
        <Routes>
            
            <Route path="/" element={
                <ProtectedRoutes>
                    <Home />
                </ProtectedRoutes>
            } />

            <Route path="/report/:interviewId" element={
                <ProtectedRoutes>
                    <InterviewReport />
                </ProtectedRoutes>
            } />


            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </>)
}