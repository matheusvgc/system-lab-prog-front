
import Header from "@/components/header";
import useAuth from "@/hooks/useAuth"
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";

export default function OrdersPage() {

    const { user, loading } = useAuth();

    return (
        <>
            <Header/>
            {!loading ? (
                <div>
                    <h1 className="text-4xl text-center">Seus pedidos</h1>
                    {user.orders.map(order => (
                    <div key={order.orderId} className="m-3 md:mx-20">
                        <div className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                            <div>
                                <p>Pedido #{order.orderId}</p>
                                <p>Status: {order.status}</p>
                                <p>Data: {formatDate(order.createdAt)}</p>
                                <p>Total: R$ {formatPrice(order.total)}</p>
                            </div>
                            <Link to={`/order/${order.orderId}`}>Visualizar</Link>
                        </div>
                    </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <CircularProgress size={100} color={'inherit'} />
                </div>
            )}
        </>
    )
}
