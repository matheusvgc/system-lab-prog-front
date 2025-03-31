
import { ErrorMessage, Form, Field, Formik } from "formik";
import * as Yup from "yup";

import LoginHeader from "@/components/loginHeader";
import BaseButton from "@/components/ui/BaseButton";
import useAuth from "@/hooks/useAuth";

export default function Login() {

    const formSchema = Yup.object().shape({
            username: Yup.string().required("O nome de usuário é obrigatório!"),
            password: Yup.string().required("A senha é obrigatória!")
        });

    const { handleLogin, loading } = useAuth();

    return (
        <>
            <LoginHeader />
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
                
                onSubmit={async (loginData) => {
                    handleLogin(loginData);
                }}

                validationSchema={formSchema}
            >
                <Form className="p-4 grid-cols-2">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <div className="mb-2 md:grid md:grid-cols-2 md:gap-2">

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

                    </div>
                    <div className="text-center">
                        <BaseButton type="submit" loading={loading}>Fazer login</BaseButton>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
