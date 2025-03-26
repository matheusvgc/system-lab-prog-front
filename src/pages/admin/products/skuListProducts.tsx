import SkuProductsTable from "@/components/admin/tables/skuProductsTable";
import Header from "@/components/header";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductData {
    productId: string;
    productName: string;
    productDescription: string;
    summary: string;
    manufacturer: string;
    brandName: string;
}

export default function SkuListProducts() {

    const { loading } = useAuth();
    const [products, setProducts] = useState<ProductData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const response = await api.get("/product");
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleEdit = (productId: string) => {
        navigate("/createProductSku/" + productId)
    };

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10 px-4 md:px-10">
                <h1 className="text-2xl font-bold">Selecione o produto para adicionar a SKU</h1>
                {loading ? (
                    <CircularProgress size={30} color="inherit" />
                ) : (
                    <SkuProductsTable products={products} onEdit={handleEdit}/>
                )}
            </div>
        </>
    );
}
