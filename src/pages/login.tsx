import AuthTextInput from "@/components/authComponents/AuthTextInput";
import Footer from "@/components/footer";
import LoginHeader from "@/components/loginHeader";
import BaseButton from "@/components/ui/BaseButton";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

interface LoginData {
    username: string;
    password: string;
}

export default function Login() {

    const { handleLogin, loading } = useAuth()
    const [loginData, setLoginData] = useState<LoginData>({
        username: "",
        password: "",
    })
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(loginData)
    }



    return (
        <>
            <LoginHeader />
            <form className="px-[10%] sm:px-[25%] md:px-[25%] gap-2 py-32" onSubmit={submitForm}>
                <h1 className="text-center text-2xl mb-5">Login de Usuário</h1>
                <div className="flex flex-col gap-4 mb-5">
                    <AuthTextInput label="Username" name="username" placeholder="Digite seu usuário" type="text" handleInputChange={handleInputChange} />
                    <AuthTextInput label="Senha" name="password" placeholder="Digite sua senha" type="password" handleInputChange={handleInputChange} />
                </div>
                <div className="text-center">
                    {/* <button type="submit">Fazer login</button> */}
                    <BaseButton type="submit" loading={loading}>Fazer Login</BaseButton>
                </div>
            </form>
        </>
    )
}
