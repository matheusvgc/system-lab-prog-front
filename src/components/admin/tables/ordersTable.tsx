import ChangePageButton from "@/components/homePageComponents/ChangePageButton";
import BaseSelectInput from "@/components/ui/BaseSelectInput";
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
import { useEffect, useState } from "react";

interface OrdersData {
    orderId: string;
    status: string;
    total: number;
    createdAt: string;
    user: any;
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
                        <TableHead>Nome do cliente</TableHead>
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
                            <TableCell>{order.user.firstname}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{"R$ " + formatPrice(order.total)}</TableCell>
                            <TableCell>{formatDate(order.createdAt)}</TableCell>
                            <TableCell className="text-center space-x-2 flex items-center justify-center">
                                <BaseSelectInput onChange={(e: any) => changeStatus(order.orderId, e.target.value)} loading={loading}>
                                    <option value="" disabled selected>Selecione uma opção</option>
                                    <option value="APROVADO">Aprovar</option>
                                    <option value="ENVIADO">Enviar</option>
                                    <option value="CANCELADO">Cancelar</option>
                                </BaseSelectInput>
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
            <div className="text-center">
                <CircularProgress size={100} color={'inherit'} />
            </div>
        )}
        </>
    );
}
