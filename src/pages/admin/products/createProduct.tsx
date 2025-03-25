import ProductForm, { ProductData } from "@/components/admin/forms/productForm";
import Header from "@/components/header";
import api from "@/services/api";

export default function CreateProduct () {

    async function handleSubmit(productData: ProductData) {
        try {
            await api.post("/product", productData);
            return { success: true, message: "Produto cadastrado com sucesso!" };
        } catch (error) {
            return { success: false, message: "Erro ao cadastrar produto." };
        }
    }

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10">
                <h1 className="text-2xl font-bold">Cadastro de Produto</h1>
                <ProductForm onSubmit={handleSubmit}/>
            </div>
         </>
    )
}