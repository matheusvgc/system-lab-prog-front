
import Header from "@/components/header"
import useAuth from "@/hooks/useAuth"
import { useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {formatDate} from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";
import api from "@/services/api";

export default function ProfilePage() {

    const { user, loading } = useAuth();
    const [editingProfile, setEditingProfile] = useState(false);
    const [creatingAddress, setCreatingAddress] = useState(false);
    const [userForm, setUserForm] = useState({
        firstname: "",
        lastname: "",
        cpf: "",
        email: "",
    });
    const [addressForm, setAddressForm] = useState({
        country: "",
        cep: "",
        city: "",
        state: "",
        landmark: "",
        neighborhood: "",
        street: "",
        number: ""
    });

    async function editUser() {

        try {
            await api.put(`/user/${user.userId}`, {
                firstname: userForm.firstname,
                lastname: userForm.lastname,
                cpf: userForm.cpf,
                email: userForm.email,
            });
            setEditingProfile(false);
            setUserForm({
                firstname: user.firstname,
                lastname: user.lastname,
                cpf: user.cpf,
                email: user.email,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function saveAddress() {
        try {
            await api.post(`/user/address/${user.userId}`, {
                country: addressForm.country,
                cep: addressForm.cep,
                city: addressForm.city,
                state: addressForm.state,
                landmark: addressForm.landmark,
                neighborhood: addressForm.neighborhood,
                street: addressForm.street,
                number: addressForm.number,
            });
            setCreatingAddress(false);
            setAddressForm({
                country: "",
                cep: "",
                city: "",
                state: "",
                landmark: "",
                neighborhood: "",
                street: "",
                number: "",
            });
        } catch (error) {
            console.error(error);
        }
    }

    function handleAddressFormChange(event: any) {
        setAddressForm({...addressForm, [event.target.name]: event.target.value });
    }

    function handleUserFormChange(event: any) {
        setUserForm({...userForm, [event.target.name]: event.target.value });
    }

    return (
        <>
            <Header/>
            {!loading ? (

            <div className="m-4">
                <div className="flex justify-between">
                    <p className="text-2xl">{user.firstname + " " + user.lastname}</p>
                    <button 
                        className="hover:cursor-pointer hover:underline"
                        onClick={() => setEditingProfile(!editingProfile)}
                        >Editar perfil
                        
                    </button>
                </div>
                {editingProfile && (
                    <div className="m-3 md:mx-20">
                        <div className="md:grid-cols-2">
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="text" placeholder="Nome" name="firstname" value={userForm.firstname} onChange={handleUserFormChange}/>
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="text" placeholder="Sobrenome" name="lastname" value={userForm.lastname} onChange={handleUserFormChange}/>
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="email" placeholder="Email" name="email" value={userForm.email} onChange={handleUserFormChange}/>
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="text" placeholder="Cpf" name="cpf" value={userForm.cpf} onChange={handleUserFormChange}/>

                        </div>
                        <div className="text-center">
                            <button className="mx-4 hover:cursor-pointer hover:underline" onClick={() => setEditingProfile(false)}>Cancelar</button>
                            <button className="mx-4 hover:cursor-pointer hover:underline" onClick={() => editUser()}>Salvar</button>
                        </div>
                    </div>
                )}

                <h1 className="text-2xl my-2">Seus Pedidos</h1>

                <div className="mx-3 md:mx-20">
                    {user.orders.length > 0 ? (user.orders.slice(0, 3)?.map((order: any) => (
                        <div key={order.orderId} className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                            <div>
                                <p>Pedido #{order.orderId}</p>
                                <p>Status: {order.status}</p>
                                <p>Data: {formatDate(order.createdAt)}</p>
                                <p>Total: R$ {formatPrice(order.total)}</p>
                            </div>
                            <Link to={`/order/${order.orderId}`}>Visualizar</Link>
                        </div>
                        ))) : (
                            <p className="text-xl text-center">Nenhum pedido cadastrado!</p>
                        )}
                        <Link to={`/ordersPage`}><p className="text-end">Ver todos</p></Link>
                </div>
                
                <div className="flex justify-between">
                    <h1 className="text-2xl my-2">Endereços</h1>
                    <button 
                        className="hover:cursor-pointer hover:underline"
                        onClick={() => setCreatingAddress(!creatingAddress)}
                        >Adicionar endereço</button>
                </div>
                {creatingAddress && (
                    <div className="m-3 md:mx-20">
                        <div className="md:grid-cols-2">
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="text" placeholder="Cidade" name="city" value={addressForm.city} onChange={handleAddressFormChange}/>
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="text" placeholder="Estado" name="state" value={addressForm.state} onChange={handleAddressFormChange}/>
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="text" placeholder="País" name="country" value={addressForm.country} onChange={handleAddressFormChange}/>
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="text" placeholder="Rua" name="street" value={addressForm.street} onChange={handleAddressFormChange}/>
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="text" placeholder="Bairro" name="neighborhood" value={addressForm.neighborhood} onChange={handleAddressFormChange}/>
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="text" placeholder="Numero" name="number" value={addressForm.number} onChange={handleAddressFormChange}/>
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="text" placeholder="CEP" name="cep" value={addressForm.cep} onChange={handleAddressFormChange}/>
                            <input className="border-2 w-full p-2 my-2 rounded-lg" type="text" placeholder="Complemento" name="landmark" value={addressForm.landmark} onChange={handleAddressFormChange}/>
                        </div>
                        <div className="text-center">
                            <button className="mx-4 hover:cursor-pointer hover:underline" onClick={() => setCreatingAddress(false)}>Cancelar</button>
                            <button className="mx-4 hover:cursor-pointer hover:underline" onClick={() => saveAddress()}>Salvar</button>
                        </div>
                    </div>
                )}

                <div>
                {user.addresses.length > 0 ? (user.addresses.map(addresses => (
                    <div key={addresses.addressId} className="m-3 md:mx-20 border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                        <div>
                            <p>{addresses.street}, {addresses.number}, {addresses.landmark}</p>
                            <p>{addresses.city}, {addresses.state}</p>
                            <p>{addresses.cep}</p>
                        </div>
                        <button>Editar</button>
                    </div>
                    ))) : (
                        <p className="text-xl text-center">Nenhum endereço cadastrado!</p>
                    )}
                </div>
            </div>
        ) : (
            <div className="text-center">
                <CircularProgress size={100} color={'inherit'} />
            </div>
        )}
        </>
    )
}
