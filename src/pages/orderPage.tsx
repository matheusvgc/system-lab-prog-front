import Header from "@/components/header"
import api from "@/services/api";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";
import { CircularProgress } from "@mui/material";


export default function OrderPage() {

    const { orderId } = useParams();
    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    });

    async function fetchOrder() {
        try {
            const response = await api.get("/orders/" + orderId);
            console.log(response.data);
            setOrder(response.data);
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header/>
            <div>
                {!loading ? (
                    <>
                    <h1>Pedido #{order?.orderId}</h1>
                    <div>
                        <p>Status: {order?.status}</p>
                        <p>Data: {formatDate(order?.createdAt)}</p>
                        <p>Total: R$ {formatPrice(order?.total)}</p>
                    </div>
                    <h1>Itens</h1>
                    {order?.orderItems.map(item => (
                        <div>
                            <p>Produto: {item.productSku.product.productName}</p>
                            <p>Categoria: {item.productSku.product.category}</p>
                            <p>Descrição: {item.productSku.product.productDescription}</p>
                            <p>Quantitidade: {item.quantity}</p>
                            <p>Preço: R$: {formatPrice(item.productSku.price)}</p>
                        </div>
                    ))}
                    </>
                ) : (
                    <div className="text-center">
                        <CircularProgress size={100} color={'inherit'} />
                    </div>
                )}
                
            </div>
        </>
    )
}

