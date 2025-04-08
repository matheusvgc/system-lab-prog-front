import * as Yup from "yup";
import { useAlert } from "@/hooks/useAlert";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import BaseButton from "../ui/BaseButton";
import api from "@/services/api";
import { getErrorMessage } from "@/utils/errorHandler";

interface Props {
    userId: string;
}

export default function AddAddressForm({ userId }: Props) {

    const formSchema = Yup.object().shape({
        country: Yup.string().required("País é obrigatório!"),
        cep: Yup.string().required("CEP é obrigatório!"),
        city: Yup.string().required("Cidade é obrigatória!"),
        state: Yup.string().required("Estado é obrigatório!"),
        landmark: Yup.string().required("Ponto de referência é obrigatório!"),
        neighborhood: Yup.string().required("Bairro é obrigatório!"),
        street: Yup.string().required("Rua é obrigatória!"),
        number: Yup.string().required("Número é obrigatório!")
    })

    const { createAlert } = useAlert();
    const [loading, setLoading] = useState(false);

    return (
        <Formik

            initialValues={{
                country: "",
                cep: "",
                city: "",
                state: "",
                landmark: "",
                neighborhood: "",
                street: "",
                number: ""
            }}

            onSubmit={async (addressData) => {
                setLoading(true);
                try {
                    await api.post(`/user/address/${userId}`, {
                        country: addressData.country,
                        cep: addressData.cep,
                        city: addressData.city,
                        state: addressData.state,
                        landmark: addressData.landmark,
                        neighborhood: addressData.neighborhood,
                        street: addressData.street,
                        number: addressData.number,
                    });

                    createAlert("Endereço criado com sucesso!", "success");
                    window.location.reload();
                } catch (error) {
                    createAlert(getErrorMessage(error), "error");
                } finally {
                    setLoading(false);
                }
            }}

            validationSchema={formSchema}

        >
            <Form>
                <div className="mb-2 md:grid md:grid-cols-2 md:gap-2">
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="city">Cidade:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="city" placeholder="Preencha a cidade"/>
                        <ErrorMessage name='city'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="state">Estado:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="state" placeholder="Preencha o estado"/>
                        <ErrorMessage name='state'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="country">País:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="country" placeholder="Preencha o país"/>
                        <ErrorMessage name='country'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="street">Rua:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="street" placeholder="Preencha a rua"/>
                        <ErrorMessage name='street'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="landmark">Complemento:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="landmark" placeholder="Preencha o complemento"/>
                        <ErrorMessage name='landmark'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="cep">CEP:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="cep" placeholder="Preencha o cep"/>
                        <ErrorMessage name='cep'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="number">Número:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="number" placeholder="Preencha o número"/>
                        <ErrorMessage name='number'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="neighborhood">Bairro:</label>
                        <Field className="p-2 rounded-lg bg-gray-200" name="neighborhood" placeholder="Preencha o bairro"/>
                        <ErrorMessage name='neighborhood'>
                            {msg => <p className="text-red-500">{msg}</p>}
                        </ErrorMessage>
                    </div>

                </div>
                <div className="text-center">
                    <BaseButton type="submit" loading={loading}>Adicionar endereço</BaseButton>
                </div>
            </Form>
        </Formik>
    );
}
