import { Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

interface ProtectedRoutesProps {
    component: React.ElementType;
    authenticated: boolean;
    loading: boolean;
}

export default function ProtectedRoute({ component: Component, authenticated, loading } : ProtectedRoutesProps) {
    if (loading) {
        return <CircularProgress size={30} color={'inherit'} />;
    }

    return authenticated ? <Component /> : <Navigate to="/login" />;
}