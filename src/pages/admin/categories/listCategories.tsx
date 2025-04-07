import CategoriesTable from "@/components/admin/tables/categoriesTable";
import Header from "@/components/header";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ListCategories() {

    const { loading } = useAuth();
    const navigate = useNavigate();
    const handleEdit = (categoryId: string) => {
        navigate("/editCategory/" + categoryId)
    };

    async function handleDelete (categoryId: string) {
        if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;
        
        try {
            const response = await api.delete(`categories/${categoryId}`);
            if (response.status === 204) {
                alert("Categoria deletada!");
            } else {
                alert("Erro ao excluir a categoria!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10 px-4 md:px-10">
                <h1 className="text-2xl font-bold">Editar Categorias</h1>
                {loading ? (
                    <CircularProgress size={30} color="inherit" />
                ) : (
                    <CategoriesTable onEdit={handleEdit} onDelete={handleDelete} />
                )}
            </div>
        </>
    );
}
