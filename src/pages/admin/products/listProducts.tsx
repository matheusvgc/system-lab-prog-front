import ProductsTable from "@/components/admin/tables/productsTable";
import Header from "@/components/header";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

export default function ListProducts() {

    const navigate = useNavigate();
    
    const handleEdit = (productId: string) => {
        navigate("/editProduct/" + productId)
    };

    async function handleDelete (productId: string) {
        if (!confirm("Tem certeza que deseja excluir este produto?")) return;
        
        try {
            const response = await api.delete(`product/${productId}`);
            if (response.status === 204) {
                alert("Produto deletado!");
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
                <ProductsTable onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </>
    );
}
