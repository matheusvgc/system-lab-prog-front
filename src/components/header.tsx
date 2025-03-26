import { Input } from "@/components/ui/input"
import { useState } from "react";
import { FiShoppingCart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import UserIcon from "./ui/UserIcon";
import { CircularProgress, Stack } from "@mui/material";
import useAuth from "@/hooks/useAuth";

export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const { authenticated, handleLogOut, userType, user, loading } = useAuth();
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <header className="w-full bg-black flex justify-center">
                <div className="w-full max-w-7xl py-6 px-4 md:px-10 flex flex-col md:flex-row gap-4 md:gap-10 items-center justify-between text-white">
                    <div className="relative w-full flex items-center justify-between gap-4 md:block md:w-auto">
                        {menuOpen ? <FiX onClick={toggleMenu} className="md:hidden z-20" size={30} /> : <FiMenu onClick={toggleMenu} className="md:hidden z-20" size={30} />}
                        <a href="/" className='font-bold text-xl text-center text-nowrap'>TECH SHOP</a>
                        <a href="/"><FiShoppingCart className="md:hidden" size={28} /></a>
                    </div>

                    <div className=" w-full relative">
                        <Input className="text-black" placeholder="Digite o que deseja..." />
                        <a href="/">
                            <FiSearch className="absolute right-2 top-2" size={18} color="black" />
                        </a>
                    </div>
                    {loading ?
                        <CircularProgress
                            size={30}
                            color={'inherit'}
                        />
                        : <nav className="hidden md:block text-nowrap">
                            <ul className="flex gap-10 items-center">
                                {!authenticated ? <li className="relative cursor-pointer group">
                                    <a href="/">Faça login ou<br /> cadastre-se</a>
                                    <ul className="absolute p-2 top-30% left-0 w-[200px] bg-white rounded-md shadow-md hidden group-hover:block transition-opacity">
                                        <li className="py-2 text-black"><Link to="/login">Login</Link></li>
                                        <li className="py-2 text-black"><Link to="/signup">Cadastro</Link></li>
                                    </ul>
                                </li> : <Stack direction={'row'} alignItems={'center'} gap={5}><Link to="/customerProfile"><UserIcon name={user.username} loading={loading} /></Link>  <button type="button" className="cursor-pointer" onClick={() => handleLogOut()}>Sair</button> </Stack>}

                                <li>
                                    <a href="/">Produtos</a>
                                </li>
                                {authenticated ? <li>
                                    <a href="/cartPage">
                                        <FiShoppingCart className="hidden md:block" size={28} />
                                    </a>
                                </li> : null}

                            </ul>
                        </nav>}


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
                </div>
            </header>
        </>
    )
}