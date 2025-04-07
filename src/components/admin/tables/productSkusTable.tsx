import ChangePageButton from "@/components/homePageComponents/ChangePageButton";
import Button from "@/components/ui/button";
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
import { CircularProgress } from "@mui/material";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductSkuData {
    productSkuId: string,
    sku: string;
    price: number;
    stockQuantity: number;
}

interface ProductSkusTableProps {
    productId: string | undefined;
    onEdit: (sku: string) => void;
    onDelete: (sku: string) => void;
}

export default function ProductSkusTable({ productId, onEdit, onDelete }: ProductSkusTableProps) {
    
    const { createAlert } = useAlert();
    const [loading, setLoading] = useState(false);

    const [skus, setSkus] = useState<ProductSkuData[]>([]);
    const [page, setPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);

    useEffect(() => {
        fetchOrders();
    }, [page]);

    async function fetchOrders() {
        try {
            setLoading(true);
            const response = await api.get(`/productSku/product/${productId}`, {
                params: {
                    page: page,
                    size: 10
                }
            });
            setSkus(response.data.content);
            setPage(response.data.pageable.pageNumber);
            setNumberOfPages(response.data.totalPages);
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
        {!loading ? (
            <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Quantidade em Estoque</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skus.map((sku) => (
                        <TableRow key={sku.productSkuId}>
                            <TableCell>{sku.sku}</TableCell>
                            <TableCell>R$ {(sku.price / 100).toFixed(2).replace(".", ",")}</TableCell>
                            <TableCell>{sku.stockQuantity}</TableCell>
                            <TableCell className="text-center space-x-2 flex items-center justify-center">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => onEdit(sku.productSkuId)}
                                    >
                                    <Pencil size={16} className="mr-1" /> Editar
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    size="sm" 
                                    onClick={() => onDelete(sku.productSkuId)}
                                    >
                                    <Trash size={16} className="mr-1" /> Excluir
                                </Button>
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
