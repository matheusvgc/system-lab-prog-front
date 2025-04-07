import ChangePageButton from "@/components/homePageComponents/ChangePageButton";
import BaseButton from "@/components/ui/BaseButton";
import {

    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAlert } from "@/hooks/useAlert";
import api from "@/services/api";
import { getErrorMessage } from "@/utils/errorHandler";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import { CircularProgress } from "@mui/material";
import { ClipboardPaste, ClipboardX } from "lucide-react";
import { useEffect, useState } from "react";

interface OrdersData {
    orderId: string;
    status: string;
    total: number;
    createdAt: string;
}

export default function OrdersTable() {

    const { createAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [fetchOrdersLoading, setFetchOrdersLoading] = useState(false);

    const [orders, setOrders] = useState<OrdersData[]>([]);
    const [page, setPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);

    useEffect(() => {
        fetchOrders();
    }, [page]);

    async function fetchOrders() {
        try {
            setFetchOrdersLoading(true);
            const response = await api.get("/orders", {
                params: {
                    page: page,
                    size: 10
                }
            });
            setOrders(response.data.content);
            setPage(response.data.pageable.pageNumber);
            setNumberOfPages(response.data.totalPages);
        } catch (error) {
            createAlert(getErrorMessage(error), "error");
        } finally {
            setFetchOrdersLoading(false);
        }
    }

    async function changeStatus(orderId: string, status: string) {
        setLoading(true);
        try {
            await api.put(`/orders/changeStatus/${orderId}`, {
                status
            });
            fetchOrders();
            createAlert("Status do pedido alterado com sucesso!", "success");
        } catch (error) {
            createAlert(getErrorMessage(error), "error");
        } finally {
            setLoading(false);
        }
    }

    function changePage(page: number) {
        if (page >= numberOfPages || page < 0) return;

        setPage(page);
    }

    return (
        <>
        {!fetchOrdersLoading ? (
            <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id do pedido</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Data do pedido</TableHead>
                        <TableHead colSpan={2} className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.orderId}>
                            <TableCell>{order.orderId}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{"R$ " + formatPrice(order.total)}</TableCell>
                            <TableCell>{formatDate(order.createdAt)}</TableCell>
                            <TableCell className="text-center space-x-2 flex items-center justify-center">
                                <BaseButton
                                    bgColor="bg-green-700  text-white"
                                    hoverColor="hover:bg-green-800"
                                    loading={loading}
                                    onClick={() => changeStatus(order.orderId, "DONE")}
                                    >
                                    <div className="flex">
                                        <ClipboardPaste size={16} className="mr-1"/>Aprovar
                                    </div>
                                </BaseButton>
                                <BaseButton 
                                    bgColor="bg-red-700  text-white"
                                    hoverColor="hover:bg-red-800"
                                    loading={loading}
                                    onClick={() => changeStatus(order.orderId, "REJECT")}
                                    >
                                    <div className="flex">
                                        <ClipboardX size={16} className="mr-1"/>Recusar
                                    </div>
                                </BaseButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-center gap-2">
                <ChangePageButton icon="<-" changePage={() => changePage(page - 1)} />
                {Array.from({ length: numberOfPages }).map((_, index) => (
                    <ChangePageButton key={index} icon={(index + 1).toString()} changePage={() => changePage(index)} />
                ))}
                <ChangePageButton icon="->" changePage={() => changePage(page + 1)} />
            </div>
            </>
        ) : (
            <CircularProgress size={30} color="inherit" />
        )}
        </>
    );
}
