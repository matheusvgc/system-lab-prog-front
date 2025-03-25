import { Route, Routes, Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';

import CartPage from '@/pages/cartPage';
import HomePage from '@/pages/homePage';
import Product from '@/pages/product';
import Login from '@/pages/login';
import SignUpPage from '@/pages/signUp';
import { CircularProgress } from '@mui/material';

//Admin Pages
import HomeAdmin from '@/pages/admin/homeAdmin';

    //products
import ManageProducts from '@/pages/admin/products';
import CreateProduct from '@/pages/admin/products/createProduct';
import ListProducts from '@/pages/admin/products/listProducts';
import EditProduct from '@/pages/admin/products/editProduct';

import CreateProductSku from '@/pages/admin/products/createProductSku';
import EditProductSku from '@/pages/admin/products/editProductSku';

    //categories
import ManageCategories from '@/pages/admin/categories';
import CreateCategory from '@/pages/admin/categories/createCategory';

import ManageOrders from '@/pages/admin/order';
import ManageFinances from '@/pages/admin/finances';
import ListCategories from '@/pages/admin/categories/listCategories';
import EditCategory from '@/pages/admin/categories/editCategory';

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
            <Route path='/createProduct' element={<ProtectedRoute component={CreateProduct} authenticated={authenticated} loading={loading} />} />
            <Route path='/listProducts' element={<ProtectedRoute component={ListProducts} authenticated={authenticated} loading={loading} />} />
            <Route path='/editProduct/:productId' element={<ProtectedRoute component={EditProduct} authenticated={authenticated} loading={loading} />} />
            <Route path='/createProductSku' element={<ProtectedRoute component={CreateProductSku} authenticated={authenticated} loading={loading} />} />
            <Route path='/editProductSku' element={<ProtectedRoute component={EditProductSku} authenticated={authenticated} loading={loading} />} />


            <Route path='/manageCategories' element={<ProtectedRoute component={ManageCategories} authenticated={authenticated} loading={loading} />} />
            <Route path='/createCategory' element={<ProtectedRoute component={CreateCategory} authenticated={authenticated} loading={loading} />} />
            <Route path='/listCategories' element={<ProtectedRoute component={ListCategories} authenticated={authenticated} loading={loading} />} />
            <Route path='/editCategory/:categoryId' element={<ProtectedRoute component={EditCategory} authenticated={authenticated} loading={loading} />} />
            
            
            <Route path='/manageOrders' element={<ProtectedRoute component={ManageOrders} authenticated={authenticated} loading={loading} />} />
            <Route path='/manageFinances' element={<ProtectedRoute component={ManageFinances} authenticated={authenticated} loading={loading} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cartPage" element={<CartPage />} />
        </Routes>
    );
};
