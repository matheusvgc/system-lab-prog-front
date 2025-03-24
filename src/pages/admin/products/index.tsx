import ProductForm, { ProductData } from "@/components/admin/forms/productForm";
import Header from "@/components/header";
import api from "@/services/api";

export default function ManageProduct () {

    async function handleSubmit (productData: ProductData) {
        try {
            const response = await api.post("/product", productData);
            console.log("Produto cadastrado: ", response.data)
        } catch (error) {
            console.error(error)
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