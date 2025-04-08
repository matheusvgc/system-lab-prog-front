import LoginHeader from "@/components/loginHeader";
import api from "@/services/api";
import { ErrorMessage, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import BaseButton from "@/components/ui/BaseButton";
import { useAlert } from "@/hooks/useAlert";
import { getErrorMessage } from "@/utils/errorHandler";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {

    const { createAlert } = useAlert();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const formSchema = Yup.object().shape({
        firstname: Yup.string().required("O nome é obrigatório!"),
        lastname: Yup.string().required("O sobrenome é obrigatório!"),
        cpf: Yup.string().required("O cpf é obrigatório!"),
        email: Yup.string().required("O email é obrigatório!"),
        username: Yup.string().required("O nome de usuário é obrigatório!"),
        password: Yup.string().required("A senha é obrigatória!"),
        confirmPassword: Yup.string().required("A senha é obrigatória!")
    });

    return (
        <>
            <LoginHeader/>
            <Formik
                initialValues={{
                    firstname: "",
                    lastname: "",
                    cpf: "",
                    email: "",
                    username: "",
                    password: "",
                    confirmPassword: ""
                }}
                
                onSubmit={async (userData) => {
                    if (userData.password !== userData.confirmPassword) {
                        createAlert("As senhas não conferem!", "error");
                        return;
                    }

                    setLoading(true);
                    try {
                        await api.post("/auth/register", {
                            ...userData,
                            role: "CUSTOMER",
                            status: "ENABLED"
                        });
                        createAlert("Usuário cadastrado com sucesso!", "success");
                        navigate("/home");
                    } catch (err) {
                        createAlert(getErrorMessage(err), "error");
                    } finally {
                        setLoading(false);
                    }
                }}

                validationSchema={formSchema}
            >
                <Form className="p-4 grid-cols-2">
                    <h1 className="text-2xl font-bold text-center">Cadastro</h1>
                    <div className="mb-2 md:grid md:grid-cols-2 md:gap-2">

                        <div className="flex flex-col gap-2 mb-2">
                            <label htmlFor="name">Nome:</label>
                            <Field className="p-2 border-black-500 rounded-lg bg-gray-200" name="firstname" placeholder="Digite seu nome"/>
                            <ErrorMessage name='firstname'>
                                {msg => <p className="text-red-500">{msg}</p>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col gap-2 mb-2">
                            <label htmlFor="name">Sobrenome:</label>
                            <Field className="p-2 rounded-lg bg-gray-200" name="lastname" placeholder="Digite seu sobrenome"/>
                            <ErrorMessage name='lastname'>
                                {msg => <p className="text-red-500">{msg}</p>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col gap-2 mb-2">
                            <label htmlFor="name">Email:</label>
                            <Field className="p-2 rounded-lg bg-gray-200" name="email" placeholder="Digite seu email"/>
                            <ErrorMessage name='email'>
                                {msg => <p className="text-red-500">{msg}</p>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col gap-2 mb-2">
                            <label htmlFor="name">Cpf:</label>
                            <Field className="p-2 rounded-lg bg-gray-200" name="cpf" placeholder="Digite seu cpf"/>
                            <ErrorMessage name='cpf'>
                                {msg => <p className="text-red-500">{msg}</p>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col gap-2 mb-2">
                            <label htmlFor="username">Nome de usuário:</label>
                            <Field className="p-2 rounded-lg bg-gray-200" name="username" placeholder="Digite seu nome de usuário"/>
                            <ErrorMessage name='username'>
                                {msg => <p className="text-red-500">{msg}</p>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col gap-2 mb-2">
                            <label htmlFor="name">Senha:</label>
                            <Field className="p-2 rounded-lg bg-gray-200" name="password" type="password" placeholder="Digite sua senha"/>
                            <ErrorMessage name='password'>
                                {msg => <p className="text-red-500">{msg}</p>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col gap-2 mb-2">
                            <label htmlFor="name">Confirmar senha:</label>
                            <Field className="p-2 rounded-lg bg-gray-200" name="confirmPassword" type="password" placeholder="Confirme sua senha"/>
                            <ErrorMessage name='confirmPassword'>
                                {msg => <p className="text-red-500">{msg}</p>}
                            </ErrorMessage>
                        </div>

                    </div>
                    <div className="text-center">
                        <BaseButton type="submit" loading={loading}>Enviar</BaseButton>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

