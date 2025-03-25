import CategoryForm, { CategoryData } from "@/components/admin/forms/categoryForm";
import Header from "@/components/header";
import api from "@/services/api";

export default function CreateCategory () {

    async function handleSubmit(categoryData: CategoryData) {
        try {
            await api.post("/categories", categoryData);
            return { success: true, message: "Categoria cadastrada com sucesso!" };
        } catch (error) {
            return { success: false, message: "Erro ao cadastrar categoria." };
        }
    }

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10">
                <h1 className="text-2xl font-bold">Cadastro de Categoria</h1>
                <CategoryForm onSubmit={handleSubmit}/>
            </div>
         </>
    )
}