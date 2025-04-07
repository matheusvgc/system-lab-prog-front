
import Header from "@/components/header";
import useAuth from "@/hooks/useAuth"
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";
import { useEffect, useState } from "react";
import api from "@/services/api";
import ChangePageButton from "@/components/homePageComponents/ChangePageButton";


interface OrdersData {
    orderId: string;
    status: string;
    total: number;
    createdAt: string;
}

export default function OrdersPage() {

    const { user, loading } = useAuth();

    const [loadingFetchOrders, setLoadingFetchOrders] = useState(false);
    const [orders, setOrders] = useState<OrdersData[]>([]);
    const [page, setPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);

    useEffect(() => {
        if (!loading && user) {
            fetchOrders();
        }
    }, [user, loading, page]);

    async function fetchOrders() {
        setLoadingFetchOrders(true);
        try {
            const response = await api.get(`/orders/byUserId/${user.userId}`, {
                params: {
                    page: page,
                    size: 10
                }

            });
            setOrders(response.data.content);
            setPage(response.data.pageable.pageNumber);
            setNumberOfPages(response.data.totalPages);
        } catch(err) {
            console.log(err);
        } finally {
            setLoadingFetchOrders(false);
        }
    }

    function changePage(page: number) {
        if (page >= numberOfPages || page < 0) return;

        setPage(page);
    }

    return (
        <>
            <Header/>
            {!loading ? (
                <>
                <div className="my-2">
                    <h1 className="text-4xl text-center">Seus pedidos</h1>
                    {!loadingFetchOrders ? (
                        <>
                        {orders.map(order => (
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
                        </>
                    ) : (
                        <div className="text-center my-2">
                            <CircularProgress size={100} color={'inherit'} />
                        </div>
                    )}
                </div>
                <div className="flex justify-center gap-2 my-2">
                    <ChangePageButton icon="<-" changePage={() => changePage(page - 1)} />
                    {Array.from({ length: numberOfPages }).map((_, index) => (
                        <ChangePageButton key={index} icon={(index + 1).toString()} changePage={() => changePage(index)} />
                    ))}
                    <ChangePageButton icon="->" changePage={() => changePage(page + 1)} />
                </div>
                </>
            ) : (
                <div className="text-center">
                    <CircularProgress size={100} color={'inherit'} />
                </div>
            )}
        </>
    )
}
