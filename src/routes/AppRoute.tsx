import HomePage from '@/pages/homePage';
import SignUpPage from '@/pages/signUp';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

export const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage/>}/>
            </Routes>
        </Router>
    )

}
