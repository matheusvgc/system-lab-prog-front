
import Header from "@/components/header"
import useAuth from "@/hooks/useAuth"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {formatDate} from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";

export default function ProfilePage() {

    const { user, loading } = useAuth();
    const [editingProfile, setEditingProfiole] = useState(false);
    // const [orders, setOrders] = useState<any>(user.orders.slice(0, 3));

    return (
        <>
            <Header/>
            {!loading ? (

            <div className="m-4">
                <div className="flex justify-between">
                    <p className="text-2xl">{user.firstname + " " + user.lastname}</p>
                    <button className="hover:cursor-pointer hover:underline">Editar perfil</button>
                </div>

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
                            <p className="text-xl text-center">Nenhum endereço cadastrado!</p>
                        )}
                        <Link to={`/ordersPage`}><p className="text-end">Ver todos</p></Link>
                </div>
                
                <h1 className="text-2xl my-2">Endereços</h1>
                <div>
                {user.addresses.length > 0 ? (user.addresses.map(addresses => (
                    <div key={addresses.id} className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                        <div>
                            <p>{addresses.street}, {addresses.number}, {addresses.complement}</p>
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
