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

interface CategoryData {
    categoryId: string;
    categoryName: string;
    categoryDescription: string;
}

interface CategoriesTableProps {
    onEdit: (categoryId: string) => void;
    onDelete: (categoryId: string) => void;
}

export default function CategoriesTable({ onEdit, onDelete }: CategoriesTableProps) {
    
    const { createAlert } = useAlert();
    const [fetchCategoriesLoading, setFetchCategoriesLoading] = useState(false);

    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [page, setPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);

    useEffect(() => {
        fetchCategories();
    }, [page]);

    async function fetchCategories() {
        try {
            setFetchCategoriesLoading(true);
            const response = await api.get("/categories", {
                params: {
                    page: page,
                    size: 10
                }
            });
            setCategories(response.data.content);
            setPage(response.data.pageable.pageNumber);
            setNumberOfPages(response.data.totalPages);
        } catch (error) {
            createAlert(getErrorMessage(error), "error");
        } finally {
            setFetchCategoriesLoading(false);
        }
    }

    function changePage(page: number) {
        if (page >= numberOfPages || page < 0) return;

        setPage(page);
    }

    return (
        <>
        {!fetchCategoriesLoading ? (
            <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead colSpan={2} className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.categoryId}>
                            <TableCell>{category.categoryName}</TableCell>
                            <TableCell>{category.categoryDescription}</TableCell>
                            <TableCell className="text-center space-x-2 flex items-center justify-center">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => onEdit(category.categoryId)}
                                    >
                                    <Pencil size={16} className="mr-1" /> Editar
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    size="sm" 
                                    onClick={() => onDelete(category.categoryId)}
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
