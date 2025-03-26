import Button from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";

interface ProductData {
    productId: string;
    productName: string;
    productDescription: string;
    summary: string;
    manufacturer: string;
    brandName: string;
}

interface ProductsTableProps {
    products: ProductData[];
    onEdit: (productId: string) => void;
}

export default function EditSkuProductsTable({ products, onEdit }: ProductsTableProps) {
    return (
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
                                <Pencil size={16} className="mr-1" /> Editar SKUs
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
