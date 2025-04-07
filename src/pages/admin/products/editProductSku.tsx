import ProductSkusTable from "@/components/admin/tables/productSkusTable";
import Header from "@/components/header";
import api from "@/services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProductSkus() {
    const { productId } = useParams(); 
    const navigate = useNavigate();
    
    const handleEdit = (productSkuId: string) => {
        navigate("/editSku/" + productSkuId);
    };

    async function handleDelete(productSkuId: string) {
        if (!confirm("Tem certeza que deseja excluir este SKU?")) return;
        
        try {
            const response = await api.delete(`/productSku/${productSkuId}`);
            if (response.status === 204) {
                alert("SKU deletado!");
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
                <ProductSkusTable productId={productId} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </>
    );
}
