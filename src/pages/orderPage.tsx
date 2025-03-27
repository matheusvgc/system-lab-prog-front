import Header from "@/components/header"
import api from "@/services/api";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";
import { CircularProgress } from "@mui/material";


export default function OrderPage() {

    const { orderId } = useParams();
    const [order, setOrder] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    });

    async function fetchOrder() {
        try {
            const response = await api.get("/orders/" + orderId);
            setOrder(response.data);
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header/>
            <div className="m-3 md:m-20">
                {!loading ? (
                    <>
                    <h1 className="text-center text-2xl font-bold">Pedido #{order?.orderId}</h1>
                    <div>
                        <p>Status: {order?.status}</p>
                        <p>Data: {formatDate(order?.createdAt)}</p>
                        <p>Total: R$ {formatPrice(order?.total)}</p>
                    </div>
                    <h2 className="text-xl font-bold my-2">Itens</h2>
                    {order?.orderItems.map((item: any) => (
                        <div className="border-b-2 border-primary min-h-20 p-4">
                            <p>Produto: {item.productSku.product.productName}</p>
                            <p>Categoria: {item.productSku.product.category?.categoryName}</p>
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

