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
                
                {/* <div>
                    <p>Pedido 1</p>
                    <p>Status: Pendente</p>
                    <p>Data: 10/05/2022</p>
                    <p>Total: R$ 999,99</p>
                    <button>Visualizar</button>
                </div> */}

                <h1 className="text-2xl my-2">Endereços</h1>
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
            <Footer/>
        </>
    )
}
