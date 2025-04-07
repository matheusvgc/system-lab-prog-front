import EditSkuProductsTable from "@/components/admin/tables/editSkuProductsTable";
import Header from "@/components/header";
import { useNavigate } from "react-router-dom";

export default function EditkuListProducts() {

    const navigate = useNavigate();

    const handleEdit = (productId: string) => {
        navigate("/skusList/" + productId)
    };

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-10 px-4 md:px-10">
                <h1 className="text-2xl font-bold">Selecione o produto que deseja editar as SKUS</h1>
                <EditSkuProductsTable onEdit={handleEdit}/>
            </div>
        </>
    );
}
