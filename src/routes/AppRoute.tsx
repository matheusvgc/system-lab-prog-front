import { Route, Routes, Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';

import CartPage from '@/pages/cartPage';
import HomePage from '@/pages/homePage';
import HomeAdmin from '@/pages/admin/homeAdmin';
import Product from '@/pages/product';
import Login from '@/pages/login';
import SignUpPage from '@/pages/signUp';
import ManageProducts from '@/pages/admin/products';
import ManageOrders from '@/pages/admin/order';
import ManageCategories from '@/pages/admin/categories';
import ManageFinances from '@/pages/admin/finances';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export const AppRoutes = () => {

    const { authenticated, loading, userType } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
                path='/home'
                element={
                    loading ?
                        <CircularProgress size={30} color={'inherit'}/>
                    :
                        authenticated ? (
                            userType === 'ADMIN' ? 
                                <ProtectedRoute component={HomeAdmin} authenticated={authenticated} loading={loading} />
                            :
                                <HomePage />
                        ) :
                            <HomePage />
                }
            />
            <Route path='/manageProducts' element={<ProtectedRoute component={ManageProducts} authenticated={authenticated} loading={loading} />} />
            <Route path='/manageOrders' element={<ProtectedRoute component={ManageOrders} authenticated={authenticated} loading={loading} />} />
            <Route path='/manageCategories' element={<ProtectedRoute component={ManageCategories} authenticated={authenticated} loading={loading} />} />
            <Route path='/manageFinances' element={<ProtectedRoute component={ManageFinances} authenticated={authenticated} loading={loading} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cartPage" element={<CartPage />} />
        </Routes>
    );
};
