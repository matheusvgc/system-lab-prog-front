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

    //productSkus
import CreateProductSku from '@/pages/admin/products/createProductSku';
import SkuListProducts from '@/pages/admin/products/skuListProducts';
import EditkuListProducts from '@/pages/admin/products/editSkuListProducts';
import EditProductSkus from '@/pages/admin/products/editProductSku';
import EditSku from '@/pages/admin/products/editSku';

    //categories
import ManageCategories from '@/pages/admin/categories';
import CreateCategory from '@/pages/admin/categories/createCategory';
import ListCategories from '@/pages/admin/categories/listCategories';
import EditCategory from '@/pages/admin/categories/editCategory';

import ProfilePage from '@/pages/profilePage';
import OrdersPage from '@/pages/ordersPage';
import OrderPage from '@/pages/orderPage';

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
            <Route path="/search" element={<HomePage />} />
            <Route path='/manageProducts' element={<ProtectedRoute component={ManageProducts} authenticated={authenticated} loading={loading} />} />
            <Route path='/createProduct' element={<ProtectedRoute component={CreateProduct} authenticated={authenticated} loading={loading} />} />
            <Route path='/listProducts' element={<ProtectedRoute component={ListProducts} authenticated={authenticated} loading={loading} />} />
            <Route path='/editProduct/:productId' element={<ProtectedRoute component={EditProduct} authenticated={authenticated} loading={loading} />} />

            <Route path='/skuListProducts' element={<ProtectedRoute component={SkuListProducts} authenticated={authenticated} loading={loading} />} />
            <Route path='/createProductSku/:productId' element={<ProtectedRoute component={CreateProductSku} authenticated={authenticated} loading={loading} />} />
            <Route path='/editSkuListProducts' element={<ProtectedRoute component={EditkuListProducts} authenticated={authenticated} loading={loading} />} />
            <Route path='/skusList/:productId' element={<ProtectedRoute component={EditProductSkus} authenticated={authenticated} loading={loading} />} />
            <Route path='/editSku/:productSkuId' element={<ProtectedRoute component={EditSku} authenticated={authenticated} loading={loading} />} />


            <Route path='/manageCategories' element={<ProtectedRoute component={ManageCategories} authenticated={authenticated} loading={loading} />} />
            <Route path='/createCategory' element={<ProtectedRoute component={CreateCategory} authenticated={authenticated} loading={loading} />} />
            <Route path='/listCategories' element={<ProtectedRoute component={ListCategories} authenticated={authenticated} loading={loading} />} />
            <Route path='/editCategory/:categoryId' element={<ProtectedRoute component={EditCategory} authenticated={authenticated} loading={loading} />} />
            
            
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cartPage" element={<CartPage />} />
            <Route path="/customerProfile" element={<ProfilePage />} />
            <Route path="/ordersPage" element={<OrdersPage />} />
            <Route path="/order/:orderId" element={<OrderPage/>} />
        </Routes>
    );
};
