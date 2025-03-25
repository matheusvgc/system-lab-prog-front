import Footer from "@/components/footer";
import Header from "@/components/header";
import useAuth from "@/hooks/useAuth"
import { CircularProgress } from "@mui/material";
import { useState } from "react";

export default function OrdersPage() {

    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    return (
        <>
            <Header/>
            {
                loading ? (
                    <CircularProgress size={100} color={'inherit'} />
                ) : user.orders.map(order => (
                    <div key={order.orderId}>
                        <h2>Order ID: {order.orderId}</h2>
                        {/* <h3>Total: {formatPrice(order.total)}</h3> */}
                        <h4>Order Date: {order.orderDate}</h4>
                        <h5>Status: {order.status}</h5>
                    </div>
                ))
            }
            <Footer/>
        </>
    )
}
