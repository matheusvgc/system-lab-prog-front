import HomePage from '@/pages/homePage';
import Product from '@/pages/product';
import SignUpPage from '@/pages/signUp';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

export const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/product" element={<Product />} />
            </Routes>
        </Router>
    )

}
