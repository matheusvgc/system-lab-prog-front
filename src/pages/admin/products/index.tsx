import Header from "@/components/header"
import BaseButton from "@/components/ui/BaseButton"
import CardAdminOptions from "@/components/ui/CardAdminOptions";
import { useNavigate } from "react-router-dom"

export default function ManageProducts() {

    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-between items-center px-4 md:px-10 py-10">
                <h1 className="mb-10 font-bold text-2xl">Gestão de Produtos</h1>
                <div className="w-full max-w-180 h-full grid grid-cols-1 xsm:grid-cols-2 gap-8">
                    <CardAdminOptions
                        title="Adicionar Produto"
                        description="Aqui você pode adicionar um novo produto"
                        textButton="Adicionar"

                        redirect="/createProduct"
                        image="/imagem_adicao.png"
                        bgColor="#2196F3"
                    />
                    <CardAdminOptions
                        title="Editar Produto"
                        description="Aqui você pode editar um produto"
                        textButton="Editar"
                        textColor="text-black"
                        redirect="/listProducts"
                        image="/imagem_edicao.png"
                        bgColor="#FFC107"
                    />
                    <CardAdminOptions
                        title="Criar Sku"
                        description="Aqui você pode criar um novo SKU"
                        textButton="Criar"

                        redirect="/skuListProducts"
                        image="/imagem_adicao.png"
                        bgColor="#2196F3"
                    />
                    <CardAdminOptions
                        title="Editar Sku"
                        description="Aqui você pode editar um SKU"
                        textButton="Editar"
                        textColor="text-black"
                        redirect="/editSkuListProducts"
                        image="/imagem_edicao.png"
                        bgColor="#FFC107"
                    />


                </div>
            </div>
        </>
    )
}