import Header from "@/components/header"
import BaseButton from "@/components/ui/BaseButton"
import { useNavigate } from "react-router-dom"

export default function HomeAdmin () {

    const navigate = useNavigate();

    return (
        <>
        <Header />
        <div className="w-full h-full flex flex-col justify-between items-center px-4 md:px-10 py-10">
            <h1 className="mb-10 font-bold text-2xl">Gestão do Sistema</h1>
            <div className="w-full max-w-180 h-full grid grid-cols-1 xsm:grid-cols-2 gap-2">
                <BaseButton
                    bgColor="bg-black"
                    hoverColor="bg-black"
                    onClick={() => navigate("/manageProducts")}
                >
                    Gestão de Produtos
                </BaseButton>

                <BaseButton
                    bgColor="bg-black"
                    hoverColor="bg-black"
                    onClick={() => navigate("/manageCategories")}
                >
                    Gestão de Categorias
                </BaseButton>
            </div>
        </div>
        </>
    )
}