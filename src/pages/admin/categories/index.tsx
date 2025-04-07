import Header from "@/components/header"
import CardAdminOptions from "@/components/ui/CardAdminOptions";

export default function ManageCategories() {

    return (
        <>
            <Header />
            <div className="w-full h-full flex flex-col justify-between items-center px-4 md:px-10 py-10">
                <h1 className="mb-10 font-bold text-2xl">Gestão de Categorias</h1>
                <div className="w-full max-w-180 h-full grid grid-cols-1 xsm:grid-cols-2 gap-2">
                    <CardAdminOptions
                        title="Adicionar Categoria"
                        description="Aqui você pode adicionar uma nova categoria"
                        textButton="Adicionar"
                        // textColor="text-black"
                        redirect="/createCategory"
                        image="/imagem_adicao.png"
                        bgColor="#2196F3"
                    />
                    <CardAdminOptions
                        title="Editar Categoria"
                        description="Aqui você pode editar uma categoria"
                        textButton="Editar"
                        textColor="text-black"
                        redirect="/listCategories"
                        image="/imagem_edicao.png"
                        bgColor="#FFC107"
                    />

                </div>
            </div>
        </>
    )
}