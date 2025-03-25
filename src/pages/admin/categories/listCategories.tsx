import CategoriesTable from "@/components/admin/tables/categoriesTable";
import Header from "@/components/header";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CategoryData {
    categoryId: string;
    categoryName: string;
    categoryDescription: string;
}

export default function ListCategories() {

    const { loading } = useAuth();
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const response = await api.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleEdit = (categoryId: string) => {
        navigate("/editCategory/" + categoryId)
    };

    async function handleDelete (categoryId: string) {
        if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;
        
        try {
            const response = await api.delete(`categories/${categoryId}`);
            if (response.status === 204) {
                alert("Categoria deletada!");
                fetchCategories();
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
                    <CategoriesTable categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
                )}
            </div>
        </>
    );
}
