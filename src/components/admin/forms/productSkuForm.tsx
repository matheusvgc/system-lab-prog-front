import { useEffect, useState } from "react";

export interface ProductSkuData {
    sku: string;
    price: number;
    stockQuantity: number;
    image: File | null;
}

interface ProductSkuFormProps {
    onSubmit: (productSku: ProductSkuData) => Promise<{ success: boolean; message: string }>;
    initialProductSku?: ProductSkuData;
}

export default function ProductSkuForm({ onSubmit, initialProductSku }: ProductSkuFormProps) {
    const [message, setMessage] = useState<string | null>(null);
    const [productSku, setProductSku] = useState<ProductSkuData>({
        sku: "",
        price: 0,
        stockQuantity: 0,
        image: null,
    });

    useEffect(() => {
        if (initialProductSku) {
            setProductSku(initialProductSku);
        }
    }, [initialProductSku]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        
        setProductSku((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stockQuantity" ? Number(value) : value,
        }));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null;
        setProductSku((prev) => ({ ...prev, image: file }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!productSku.image) {
            setMessage("Por favor, selecione uma imagem.");
            return;
        }

        const formData = new FormData();
        formData.append("sku", productSku.sku);
        formData.append("price", productSku.price.toString());
        formData.append("stockQuantity", productSku.stockQuantity.toString());
        formData.append("image", productSku.image);

        const response = await onSubmit(formData as unknown as ProductSkuData);

        if (response && response.message) {
            setMessage(response.message);
        } else {
            setMessage("Erro desconhecido.");
        }

        setTimeout(() => setMessage(null), 3000);

        if (!initialProductSku) {
            setProductSku({
                sku: "",
                price: 0,
                stockQuantity: 0,
                image: null,
            });
        }
    }

    return (
        <form className="flex flex-col justify-center items-center gap-2 w-full max-w-7xl px-4 md:px-10" onSubmit={handleSubmit}>
            <input
                type="text"
                name="sku"
                value={productSku.sku}
                onChange={handleChange}
                placeholder="SKU"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <input
                type="number"
                name="price"
                value={productSku.price}
                onChange={handleChange}
                placeholder="Preço"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <input
                type="number"
                name="stockQuantity"
                value={productSku.stockQuantity}
                onChange={handleChange}
                placeholder="Quantidade em estoque"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <button className="w-50 border-2 py-2 px-6 rounded-lg bg-black text-white cursor-pointer">
                {initialProductSku ? "Salvar" : "Cadastrar"}
            </button>

            {message && <p className="text-sm mt-2 text-black-700">{message}</p>}
        </form>
    );
}
