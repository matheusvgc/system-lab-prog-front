import LoginHeader from "@/components/loginHeader"
import AuthTextInput from "@/components/authComponents/AuthTextInput";
import { useState } from "react"
import Footer from "@/components/footer";

interface IUser {
    name: string;
    lastName: string;
    cpf: string;
    birthDate: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export default function SignUpPage() {

    const [newUser, setNewUser] = useState<IUser>({
        name: "",
        lastName: "",
        cpf: "",
        birthDate: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewUser({...newUser, [e.target.name]: e.target.value });
    }

    function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (newUser.password !== newUser.confirmPassword) return;
        console.log(newUser);
    }

    return (
        <>
            <LoginHeader/>
            <form className="p-8 gap-2 mb-5" onSubmit={submitForm}>
                <h1 className="text-center text-2xl mb-5">Cadastro</h1>
                <div className="grid grid-cols-2 gap-4 mb-5">
                    <AuthTextInput label="Nome" placeholder="Digite seu nome" type="text" handleInputChange={handleInputChange}/>
                    <AuthTextInput label="Sobrenome" placeholder="Digite seu sobrenome" type="text"  handleInputChange={handleInputChange}/>
                    <AuthTextInput label="CPF" placeholder="Digite seu CPF" type="text"  handleInputChange={handleInputChange}/>
                    <AuthTextInput label="Data de nascimento" placeholder="Digite sua data de nascimento" type="text"  handleInputChange={handleInputChange}/>
                    <AuthTextInput label="Email" placeholder="Digite seu email" type="email"  handleInputChange={handleInputChange}/>
                    <AuthTextInput label="Telefone" placeholder="Digite seu telefone" type="phone"  handleInputChange={handleInputChange}/>
                    <AuthTextInput label="Senha" placeholder="Digite sua senha" type="password"  handleInputChange={handleInputChange}/>
                    <AuthTextInput label="Confirmar senha" placeholder="Confirme a senha" type="password"  handleInputChange={handleInputChange}/>
                </div>
                <div className="mx-auto my-5 py-5 w-200 bg-gray-500 text-center rounded-lg mb-5">
                    <button type="submit">Confirmar cadastro</button>
                </div>
            </form>
            <Footer/>
        </>
    )
}

