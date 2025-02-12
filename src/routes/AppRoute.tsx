import HomePage from '@/pages/homePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

export const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </Router>
    )

}
