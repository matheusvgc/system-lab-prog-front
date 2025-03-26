import Footer from "@/components/footer"
import Header from "@/components/header"
import useAuth from "@/hooks/useAuth"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function ProfilePage() {

    const { user } = useAuth();
    // const [orders, setOrders] = useState<any>(user.orders.slice(0, 3));

    return (
        <>
            <Header/>
            <div className="m-4">
                <div className="flex justify-between">
                    <p className="text-2xl">{user.firstname + " " + user.lastname}</p>
                    <button>Editar perfil</button>
                </div>

                <h1 className="text-2xl my-2">Seus Pedidos</h1>

                <div className="mx-3 md:mx-20">
                    <div className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                        <div>
                            <p>Pedido #order.id</p>
                            <p>Status: order.status</p>
                            <p>Data: formatDate(order.createdAt)</p>
                            <p>Total: R$ order.total</p>
                        </div>
                        <button>Visualizar</button>
                    </div>
                    <div className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                        <div>
                            <p>Pedido #order.id</p>
                            <p>Status: order.status</p>
                            <p>Data: formatDate(order.createdAt)</p>
                            <p>Total: R$ order.total</p>
                        </div>
                        <button>Visualizar</button>
                    </div>
                    <div className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                        <div>
                            <p>Pedido #order.id</p>
                            <p>Status: order.status</p>
                            <p>Data: formatDate(order.createdAt)</p>
                            <p>Total: R$ order.total</p>
                        </div>
                        <button>Visualizar</button>
                    </div>
                    <Link to={`/ordersPage`}><p className="text-end">Ver todos</p></Link>
                </div>

                {/* <div className="mx-20">
                    {orders && orders?.map((order: any) => (
                        <div key={order.id} className="border-b-2 border-primary min-h-20 p-4 gap-4">
                            <p>Pedido #{order.id}</p>
                            <p>Status: {order.status}</p>
                            <p>Data: {formatDate(order.createdAt)}</p>
                            <p>Total: R$ {order.total}</p>
                            <button>Visualizar</button>
                        </div>
                    ))}
                    <Link to={`/ordersPage`}><p className="text-end">Ver todos</p></Link>
                </div> */}
                
                

                <h1 className="text-2xl my-2">Endereços</h1>
                <div className="mx-3 md:mx-20">
                    <div  className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                        <div>
                            <p>addresses.street, addresses.number, addresses.complement</p>
                            <p>addresses.city, addresses.state</p>
                            <p>addresses.cep</p>
                        </div>
                        <button>Editar</button>
                    </div>
                    <div  className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                        <div>
                            <p>addresses.street, addresses.number, addresses.complement</p>
                            <p>addresses.city, addresses.state</p>
                            <p>addresses.cep</p>
                        </div>
                        <button>Editar</button>
                    </div>
                    <div  className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                        <div>
                            <p>addresses.street, addresses.number, addresses.complement</p>
                            <p>addresses.city, addresses.state</p>
                            <p>addresses.cep</p>
                        </div>
                        <button>Editar</button>
                    </div>
                </div>
                {/* <div>
                    {user.addresses.map(addresses => (
                        <div key={addresses.id} className="border-b-2 border-primary min-h-20 p-4 gap-4">
                            <p>{addresses.street}, {addresses.number}, {addresses.complement}</p>
                            <p>{addresses.city}, {addresses.state}</p>
                            <p>{addresses.zipCode}</p>
                            <button>Editar</button>
                        </div>
                    ))}
                    <p>Endereço 1</p>
                    <p>Cidade: São Paulo</p>
                    <p>CEP: 00000-000</p>
                    <button>Editar</button>
                </div> */}
            </div>
        </>
    )
}
