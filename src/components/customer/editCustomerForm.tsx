
import { ErrorMessage, Field, Form, Formik } from "formik";
import BaseButton from "../ui/BaseButton";
import { useState } from "react";
import api from "@/services/api";
import { useAlert } from "@/hooks/useAlert";
import { getErrorMessage } from "@/utils/errorHandler";

interface Props {
    userId: string;
}

export default function EditCustomerForm({ userId }: Props) {

    
    const { createAlert } = useAlert();
    const [loading, setLoading] = useState(false);

    return (
        <Formik

            initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                cpf: ""
            }}

            onSubmit={async (userData) => {
                setLoading(true);
                try {
                    await api.put(`/user/${userId}`, {
                        firstname: userData.firstname,
                        lastname: userData.lastname,
                        cpf: userData.cpf,
                        email: userData.email,
                    });

                    createAlert("Seus dados foram atualizados com sucesso!", "success");
                } catch (error) {
                    createAlert(getErrorMessage(error), "error");
                } finally {
                    setLoading(false);
                }
            }}

        >
            <Form>
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <div className="mb-2 md:grid md:grid-cols-2 md:gap-2">
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="firstname">Nome:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="firstname" placeholder="Edite seu nome"/>
                        <ErrorMessage name='firstname'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="lastname">Sobrenome:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="lastname" placeholder="Edite seu sobrenome"/>
                        <ErrorMessage name='lastname'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="email">Email:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="email" placeholder="Edite seu email"/>
                        <ErrorMessage name='email'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="cpf">Cpf:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="cpf" placeholder="Edite seu cpf"/>
                        <ErrorMessage name='cpf'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>

                </div>
                <div className="text-center">
                    <BaseButton type="submit" loading={loading}>Editar informações</BaseButton>
                </div>
            </Form>
        </Formik>
    )
}
