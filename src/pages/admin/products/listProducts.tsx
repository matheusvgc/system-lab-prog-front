import ProductsTable from "@/components/admin/tables/productsTable";
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

export default function ListProducts() {

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
        navigate("/editProduct/" + productId)
    };

    async function handleDelete (productId: string) {
        if (!confirm("Tem certeza que deseja excluir este produto?")) return;
        
        try {
            const response = await api.delete(`product/${productId}`);
            if (response.status === 204) {
                alert("Produto deletado!");
                fetchProducts();
            } else {
                alert("Erro ao excluir o produto!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10 px-4 md:px-10">
                <h1 className="text-2xl font-bold">Editar Produtos</h1>
                {loading ? (
                    <CircularProgress size={30} color="inherit" />
                ) : (
                    <ProductsTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
                )}
            </div>
        </>
    );
}
