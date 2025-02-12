import { Input } from "@/components/ui/input"
import { useState } from "react";
import { FiShoppingCart, FiMenu, FiX, FiSearch } from "react-icons/fi";

export default function Header () {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <header className="w-full bg-black py-6 px-4 md:px-10 flex flex-col md:flex-row gap-4 md:gap-10 items-center justify-between text-white">
            <div className="relative w-full flex items-center justify-between gap-4 md:block md:w-auto">
                {menuOpen ? <FiX  onClick={toggleMenu} className="md:hidden z-20" size={30}/> : <FiMenu onClick={toggleMenu} className="md:hidden z-20" size={30}/>}
                <a href="/" className='font-bold text-xl text-center text-nowrap'>TECH SHOP</a>
                <a href="/"><FiShoppingCart className="md:hidden" size={28}/></a>
            </div>

            <div className=" w-full relative">
                <Input className="text-black" placeholder="Digite o que deseja..." />
                <a href="/">
                    <FiSearch className="absolute right-2 top-2" size={18} color="black"/>
                </a>
            </div>

            <nav className="hidden md:block text-nowrap">
                <ul className="flex gap-10 items-center">
                <li>
                    <a href="/">Faça login ou<br/> cadastre-se</a>
                </li>
                <li>
                    <a href="/">Produtos</a>
                </li>
                <li>
                    <a href="/">
                        <FiShoppingCart className="hidden md:block" size={28}/>
                    </a>
                </li>
                </ul>
            </nav>

            <nav className={`${menuOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "-translate-x-full opacity-0 pointer-events-none"}
                fixed top-0 left-0 z-10 bg-black h-dvh w-dvw flex items-center justify-center
                transition transition-discrete -translate-x-10 duration-150`}>
                <ul className="text-center font-bold flex flex-col gap-4">
                    <a href="/"><li>Home</li></a>
                    <a href="/"><li>Buscar</li></a>
                    <a href="/"><li>Meus Pedidos</li></a>
                    <a href="/"><li>Carrinho</li></a>
                    <a href="/"><li>Entrar</li></a>
                </ul>
            </nav>
        </header>
    )
}