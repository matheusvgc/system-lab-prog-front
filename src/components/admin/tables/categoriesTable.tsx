import Button from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";

interface CategoryData {
    categoryId: string;
    categoryName: string;
    categoryDescription: string;
}

interface CategoriesTableProps {
    categories: CategoryData[];
    onEdit: (categoryId: string) => void;
    onDelete: (categoryId: string) => void;
}

export default function CategoriesTable({ categories, onEdit, onDelete }: CategoriesTableProps) {
    return (
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
    );
}
