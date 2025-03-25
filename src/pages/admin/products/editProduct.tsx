import ProductForm, { ProductData } from "@/components/admin/forms/productForm";
import Header from "@/components/header";
import api from "@/services/api";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function EditProduct () {

    const { productId } = useParams();
    const [ product, setProduct ] = useState<ProductData>();
    const [loadingGetProduct, setLoadingGetProduct] = useState(true)

    useEffect(() => {
        fetchProduct();
    },[])

    async function fetchProduct() {
        try {
            const response = await api.get(`/product/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingGetProduct(false)
        }
    }

    async function handleSubmit (updatedProductData: ProductData) {
        try {
            await api.put(`/product/${productId}`, updatedProductData);
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
                    <ProductForm onSubmit={handleSubmit} initialProduct={product}/>
                </div>
            }
            </div>
        </>
        
    )
}