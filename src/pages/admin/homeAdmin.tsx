import Header from "@/components/header"

import CardAdminOptions from "@/components/ui/CardAdminOptions";


export default function HomeAdmin() {



    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-between items-center px-4 md:px-10 py-10">
                <h1 className="mb-10 font-bold text-2xl">Gestão do Sistema</h1>
                <div className="flex flex-col gap-4 md:flex-row">
                    <CardAdminOptions
                        title="Gestão de Categorias"
                        description="Aqui você pode gerenciar as categorias dos produtos."
                        textButton="Gerenciar"
                        image="/gestao_categoria.png"
                        bgColor="#008080"
                        redirect="/manageCategories" />
                    <CardAdminOptions
                        title="Gestão de Produtos"
                        description="Aqui você pode gerenciar os produtos."
                        textButton="Gerenciar"
                        image="/gestao_produtos.png"
                        bgColor="#03A9F4"
                        redirect="/manageProducts" />
                    <CardAdminOptions
                        title="Gestão de Pedidos"
                        description="Aqui você pode gerenciar os pedidos"
                        textButton="Gerenciar"
                        image="/gestao_pedidos.png"
                        bgColor="#7B1FA2"
                        redirect="/manageOrders"
                    />
                </div>
            </div>
        </>
    )
}