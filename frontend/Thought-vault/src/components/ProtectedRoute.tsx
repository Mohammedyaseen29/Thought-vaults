
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    const token = localStorage.getItem("token")
    return token ? <Outlet/> : <Navigate to="/sign-up"/>
}
