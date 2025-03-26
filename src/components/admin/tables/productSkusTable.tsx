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

interface ProductSkuData {
    productSkuId: string,
    sku: string;
    price: number;
    stockQuantity: number;
}

interface ProductSkusTableProps {
    skus: ProductSkuData[];
    onEdit: (sku: string) => void;
    onDelete: (sku: string) => void;
}

export default function ProductSkusTable({ skus, onEdit, onDelete }: ProductSkusTableProps) {
    return (
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
    );
}
