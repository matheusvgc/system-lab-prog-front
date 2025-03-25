import Header from "@/components/header";
import api from "@/services/api";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import CategoryForm, { CategoryData } from "@/components/admin/forms/categoryForm";

export default function EditCategory () {

    const { categoryId } = useParams();
    const [ category, setCategory] = useState<CategoryData>();
    const [loadingGetCategory, setLoadingGetCategory] = useState(true)

    useEffect(() => {
        fetchCategory();
    },[])

    async function fetchCategory() {
        try {
            const response = await api.get(`/categories/${categoryId}`);
            setCategory(response.data);
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingGetCategory(false)
        }
    }

    async function handleSubmit (updatedCategoryData: CategoryData) {
        try {
            await api.put(`/categories/${categoryId}`, updatedCategoryData);
            return { success: true, message: "Categoria editada com sucesso!" };
        } catch (error) {
            return { success: false, message: "Erro ao editar categoria." };
        }
    }

    return (
        <>
            <Header />
            <div>
            {loadingGetCategory ?
                <div>
                    <CircularProgress size={30} color={"inherit"} />
                </div>
                :
                <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10">
                    <h1 className="text-2xl font-bold">Edição de Categoria</h1>
                    <CategoryForm onSubmit={handleSubmit} initialCategory={category}/>
                </div>
            }
            </div>
        </>
        
    )
}