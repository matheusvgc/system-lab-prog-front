import ProductSkuForm, { ProductSkuData } from "@/components/admin/forms/productSkuForm";
import Header from "@/components/header";
import api from "@/services/api";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function EditSku () {

    const { productSkuId } = useParams();
    const [ productSku, setProductSku ] = useState<ProductSkuData>();
    const [loadingGetProduct, setLoadingGetProduct] = useState(true)

    useEffect(() => {
        fetchProduct();
    },[])

    async function fetchProduct() {
        try {
            const response = await api.get(`/productSku/${productSkuId}`);
            setProductSku(response.data);
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingGetProduct(false)
        }
    }

    async function handleSubmit (updatedProductSkuData: ProductSkuData) {
        try {
            await api.put(`/productSku/${productSkuId}`, updatedProductSkuData);
            return { success: true, message: "Produto editado com sucesso!" };
        } catch (error) {
            return { success: false, message: "Erro ao editar produto." };
        }
    }

    return (
        <>
            <Header />
            <div>
            {loadingGetProduct ?
                <div>
                    <CircularProgress size={30} color={"inherit"} />
                </div>
                :
                <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10">
                    <h1 className="text-2xl font-bold">Edição de Produto</h1>
                    <ProductSkuForm onSubmit={handleSubmit} initialProductSku={productSku}/>
                </div>
            }
            </div>
        </>
        
    )
}