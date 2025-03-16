import AuthTextInput from "@/components/authComponents/AuthTextInput";
import Footer from "@/components/footer";
import LoginHeader from "@/components/loginHeader";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

interface LoginData {
    username: string;
    password: string;
}

export default function Login() {

    const { handleLogin } = useAuth()
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
            <form className="p-8 gap-2 mb-5" onSubmit={submitForm}>
                <h1 className="text-center text-2xl mb-5">Efetue seu login</h1>
                <div className="flex flex-col gap-4 mb-5">
                    <AuthTextInput label="Username" name="username" placeholder="Digite seu usuário" type="text" handleInputChange={handleInputChange} />
                    <AuthTextInput label="Senha" name="password" placeholder="Digite sua senha" type="password" handleInputChange={handleInputChange} />
                </div>
                <div className="mx-auto my-5 py-5 w-200 bg-gray-500 text-center rounded-lg mb-5">
                    <button type="submit">Fazer login</button>
                </div>
            </form>
            <Footer />
        </>
    )
}
