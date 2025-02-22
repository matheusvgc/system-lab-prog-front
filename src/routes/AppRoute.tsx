import HomePage from '@/pages/homePage';
import Login from '@/pages/login';
import SignUpPage from '@/pages/signUp';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

export const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </Router>
    )

}
