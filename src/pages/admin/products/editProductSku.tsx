import ProductSkusTable from "@/components/admin/tables/productSkusTable";
import Header from "@/components/header";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ProductSkuData {
    productSkuId: string,
    sku: string;
    price: number;
    stockQuantity: number;
}

export default function EditProductSkus() {
    const { loading } = useAuth();
    const [skus, setSkus] = useState<ProductSkuData[]>([]);
    const navigate = useNavigate();
    const { productId } = useParams();

    useEffect(() => {
        fetchSkus();
    }, []);

    async function fetchSkus() {
        try {
            const response = await api.get(`/productSku/product/${productId}`);
            setSkus(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleEdit = (productSkuId: string) => {
        navigate("/editSku/" + productSkuId);
    };

    async function handleDelete(productSkuId: string) {
        if (!confirm("Tem certeza que deseja excluir este SKU?")) return;
        
        try {
            const response = await api.delete(`/productSku/${productSkuId}`);
            if (response.status === 204) {
                alert("SKU deletado!");
                fetchSkus();
            } else {
                alert("Erro ao excluir o SKU!");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10 px-4 md:px-10">
                <h1 className="text-2xl font-bold">Gerenciar SKUs</h1>
                {loading ? (
                    <CircularProgress size={30} color="inherit" />
                ) : (
                    <ProductSkusTable skus={skus} onEdit={handleEdit} onDelete={handleDelete} />
                )}
            </div>
        </>
    );
}
