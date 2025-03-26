import ProductSkuForm, { ProductSkuData } from "@/components/admin/forms/productSkuForm";
import Header from "@/components/header";
import api from "@/services/api";
import { useParams } from "react-router-dom";

export default function CreateProduct () {

    const { productId } = useParams();

    async function handleSubmit(productSkuData: ProductSkuData) {
        try {
            await api.post(`/product/productSku/${productId}`, productSkuData);
            return { success: true, message: "Sku cadastrada com sucesso!" };
        } catch (error) {
            return { success: false, message: "Erro ao cadastrar sku." };
        }
    }

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10">
                <h1 className="text-2xl font-bold">Cadastro de Sku</h1>
                <ProductSkuForm onSubmit={handleSubmit}/>
            </div>
         </>
    )
}