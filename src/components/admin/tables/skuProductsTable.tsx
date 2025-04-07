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
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductData {
    productId: string;
    productName: string;
    productDescription: string;
    summary: string;
    manufacturer: string;
    brandName: string;
}

interface ProductsTableProps {
    onEdit: (productId: string) => void;
}

export default function SkuProductsTable({ onEdit }: ProductsTableProps) {
    
    const { createAlert } = useAlert();
    
    const [products, setProducts] = useState<ProductData[]>([]);
    const [fetchProductsLoading, setFetchProductsLoading] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);

    useEffect(() => {
        fetchProducts();
    }, [page]);

    async function fetchProducts() {
        try {
            setFetchProductsLoading(true);
            const response = await api.get("/product", {
                params: {
                    page: page,
                    size: 10
                }
            });
            setPage(response.data.pageable.pageNumber);
            setNumberOfPages(response.data.totalPages);
            setProducts(response.data.content);
        } catch (error) {
            createAlert(getErrorMessage(error), "error");
        } finally {
            setFetchProductsLoading(false);
        }
    }

    function changePage(page: number) {
        if (page >= numberOfPages || page < 0) return;

        setPage(page);
    }

    return (
        <>
            {!fetchProductsLoading ? (
                <>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Resumo</TableHead>
                            <TableHead>Fabricante</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead colSpan={2} className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.productId}>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.productDescription}</TableCell>
                                <TableCell>{product.summary}</TableCell>
                                <TableCell>{product.manufacturer}</TableCell>
                                <TableCell>{product.brandName}</TableCell>
                                <TableCell className="text-center space-x-2 flex items-center justify-center">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => onEdit(product.productId)}
                                    >
                                        <Plus size={16} className="mr-1" /> Criar SKU
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
