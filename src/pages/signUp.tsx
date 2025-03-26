import LoginHeader from "@/components/loginHeader"
import AuthTextInput from "@/components/authComponents/AuthTextInput";
import { useState } from "react"
import Footer from "@/components/footer";
import api from "@/services/api";

interface IUser {
    firstname: string;
    lastname: string;
    cpf: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export default function SignUpPage() {

    const [newUser, setNewUser] = useState<IUser>({
        firstname: "",
        lastname: "",
        cpf: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewUser({...newUser, [e.target.name]: e.target.value });
    }

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (newUser.password !== newUser.confirmPassword) return;
        
        try {
            const newCustomer = await api.post("/auth/register", {
                ...newUser,
                role: "CUSTOMER",
                status: "ENABLED"
            });
            console.log(newCustomer.data);
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <>
            <LoginHeader/>
            <form className="p-8 gap-2 mb-5" onSubmit={submitForm}>
                <h1 className="text-center text-2xl mb-5">Cadastro</h1>
                <div className="flex flex-col gap-4 mb-5 md:grid md:grid-cols-2">
                    <AuthTextInput label="Nome" placeholder="Digite seu nome" type="text" name="firstname" handleInputChange={handleInputChange}/>
                    <AuthTextInput label="Sobrenome" placeholder="Digite seu sobrenome" type="text" name="lastname" handleInputChange={handleInputChange}/>
                    <AuthTextInput label="CPF" placeholder="Digite seu CPF" type="text" name="cpf" handleInputChange={handleInputChange}/>
                    <AuthTextInput label="Email" placeholder="Digite seu email" type="email" name="email"  handleInputChange={handleInputChange}/>
                    <AuthTextInput label="Senha" placeholder="Digite sua senha" type="password" name="password"  handleInputChange={handleInputChange}/>
                    <AuthTextInput label="Confirmar senha" placeholder="Confirme a senha" type="password" name="confirmPassword"  handleInputChange={handleInputChange}/>
                    <AuthTextInput label="Nome de usuário" placeholder="Digite seu nome de usuário" type="text" name="username"  handleInputChange={handleInputChange}/>
                </div>
                <div className="mx-auto my-5 py-5 w-full bg-gray-500 text-center text-white rounded-lg mb-5 hover:cursor-pointer lg:w-200">
                    <button type="submit">Confirmar cadastro</button>
                </div>
            </form>
            <Footer/>
        </>
    )
}

