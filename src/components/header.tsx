import { Input } from "@/components/ui/input"
import { FiShoppingCart, FiMenu } from "react-icons/fi";

export default function Header () {
    return (
        <header className="w-full bg-black py-6 px-4 md:px-10 flex flex-col md:flex-row gap-4 md:gap-10 items-center justify-between text-white">
            <div className="w-full flex items-center justify-between gap-4 md:block md:w-auto">
                <FiMenu className="md:hidden" size={30}/>
                <h1 className='font-bold text-xl text-center text-nowrap'>TECH SHOP</h1>
                <FiShoppingCart className="md:hidden" size={28}/>
            </div>

            <Input className="text-black" placeholder="Digite o que deseja..." />

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
        </header>
    )
}