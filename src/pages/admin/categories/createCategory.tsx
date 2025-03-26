import CategoryForm, { CategoryData } from "@/components/admin/forms/categoryForm";
import Header from "@/components/header";
import { useAlert } from "@/hooks/useAlert";
import api from "@/services/api";
import { getErrorMessage } from "@/utils/errorHandler";
import { useState } from "react";

export default function CreateCategory() {
    const { createAlert } = useAlert();
    const [loading, setLoading] = useState(false)
    async function handleSubmit(categoryData: CategoryData) {
        setLoading(true)
        try {
            await api.post("/categories", categoryData);
            createAlert(getErrorMessage("Categoria cadastrada com sucesso!"), "success");
            return { success: true, message: "Categoria cadastrada com sucesso!" };
        } catch (error) {
            createAlert(getErrorMessage(error), "error");
            return { success: false, message: "Erro ao cadastrar categoria." };
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10">
                <h1 className="text-2xl font-bold">Cadastro de Categoria</h1>
                <CategoryForm loading={loading} onSubmit={handleSubmit} />
            </div>
        </>
    )
}