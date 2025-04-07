
import Header from "@/components/header"
import useAuth from "@/hooks/useAuth"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {formatDate} from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";
import api from "@/services/api";
import BaseButton from "@/components/ui/BaseButton";
import EditCustomerForm from "@/components/customer/editCustomerForm";
import AddAddressForm from "@/components/customer/addAddressForm";
import { useAlert } from "@/hooks/useAlert";
import { getErrorMessage } from "@/utils/errorHandler";

export default function ProfilePage() {

    const { user, loading } = useAuth();
    const { createAlert } = useAlert();
    const [editingProfile, setEditingProfile] = useState(false);
    const [creatingAddress, setCreatingAddress] = useState(false);
    const [deleteAddressLoading, setDeleteAddressLoading] = useState(false);

    const [orders, setOrders] = useState([]);
    const [loadingFetchOrders, setLoadingFetchOrders] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            fetchOrders();
        }
    }, [user, loading]);

    async function fetchOrders() {
        setLoadingFetchOrders(true);
        try {
            const response = await api.get(`/orders/byUserId/${user.userId}`, {
                params: {
                    page: 0,
                    size: 3
                }

            });
            setOrders(response.data.content);
        } catch(err) {
            console.log(err);
        } finally {
            setLoadingFetchOrders(false);
        }
    }

    async function deleteAddress(addressId: string) {
        setDeleteAddressLoading(true);
        try {
            await api.delete(`/addresses/${addressId}`);
            createAlert("Endereço deletado com sucesso!", "success");
        } catch (error) {
            createAlert(getErrorMessage(error), "error");
        } finally {
            setDeleteAddressLoading(false);
        }
    }

    return (
        <>
            <Header/>
            {!loading ? (

            <div className="m-4">
                <div className="flex justify-between">
                    <p className="text-2xl">{user.firstname + " " + user.lastname}</p>
                    <BaseButton onClick={() => setEditingProfile(!editingProfile)}>
                        {!editingProfile ? "Editar perfil" : "Fechar"}
                    </BaseButton>
                </div>
                {editingProfile && (
                    <EditCustomerForm userId={user.userId}/>
                )}

                <h1 className="text-2xl my-2">Seus Pedidos</h1>

                <div className="mx-3 md:mx-20">
                    {!loadingFetchOrders ? (
                        <>
                        {orders.length > 0 ? (orders.map((order: any) => (
                            <div key={order.orderId} className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                                <div>
                                    <p>Pedido #{order.orderId}</p>
                                    <p>Status: {order.status}</p>
                                    <p>Data: {formatDate(order.createdAt)}</p>
                                    <p>Total: R$ {formatPrice(order.total)}</p>
                                </div>
                                <Link to={`/order/${order.orderId}`}><p className="hover:cursor-pointer hover:underline">Visualizar</p></Link>
                            </div>
                            ))) : (
                                <p className="text-xl text-center">Nenhum pedido cadastrado!</p>
                            )}
                        {orders.length > 0 && <Link to={`/ordersPage`}><p className="text-end hover:cursor-pointer hover:underline">Ver todos</p></Link>}
                        </>
                    ) : (
                        <div className="text-center">
                            <CircularProgress size={100} color={'inherit'} />
                        </div>
                    )}
                </div>
                
                <div className="flex justify-between">
                    <h1 className="text-2xl my-2">Endereços</h1>
                    <BaseButton onClick={() => setCreatingAddress(!creatingAddress)}>
                        {!creatingAddress ? "Adicionar endereço": "Fechar"}
                    </BaseButton>
                </div>
                {creatingAddress && (
                    <AddAddressForm userId={user.userId}/>
                )}

                <div>
                {user.addresses.length > 0 ? (user.addresses.map(address => (
                    <div key={address.addressId} className="m-3 md:mx-20 border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                        <div>
                            <p>{address.street}, {address.number}, {address.landmark}</p>
                            <p>{address.city}, {address.state}</p>
                            <p>{address.cep}</p>
                        </div>
                        <BaseButton bgColor="bg-red-500" hoverColor="bg-red-200" loading={deleteAddressLoading} onClick={() => deleteAddress(address.addressId)}>Apagar</BaseButton>
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
