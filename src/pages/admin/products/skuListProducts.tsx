import SkuProductsTable from "@/components/admin/tables/skuProductsTable";
import Header from "@/components/header";
import { useNavigate } from "react-router-dom";



export default function SkuListProducts() {

    const navigate = useNavigate();
    
    const handleEdit = (productId: string) => {
        navigate("/createProductSku/" + productId)
    };

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10 px-4 md:px-10">
                <h1 className="text-2xl font-bold">Selecione o produto para adicionar a SKU</h1>
                <SkuProductsTable onEdit={handleEdit}/>
            </div>
        </>
    );
}
