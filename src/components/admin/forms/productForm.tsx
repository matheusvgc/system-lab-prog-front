import { useEffect, useState } from "react";

export interface ProductData {
    productName: string;
    productDescription: string;
    summary: string;
    manufacturer: string;
    brandName: string;
}

interface ProductFormProps {
    onSubmit: (product: ProductData) => Promise<{ success: boolean; message: string }>;
    initialProduct?: ProductData;
}

export default function ProductForm ( { onSubmit, initialProduct } : ProductFormProps ) {

    const [ message, setMessage ] = useState<string | null>(null);
    const [ product, setProduct ] = useState<ProductData>({
        productName: "",
        productDescription: "",
        summary: "",
        manufacturer: "",
        brandName: "",
    })

    useEffect(() => {
        if (initialProduct) {
            setProduct(initialProduct);
        }
    }, [initialProduct])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setProduct({...product, [e.target.name]: e.target.value,});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const response = await onSubmit(product);
    
        if (response && response.message) {
            setMessage(response.message);
        } else {
            setMessage("Erro desconhecido.");
        }
    
        setTimeout(() => setMessage(null), 3000);
    
        if (!initialProduct) {
            setProduct({
                productName: "",
                productDescription: "",
                summary: "",
                manufacturer: "",
                brandName: "",
            });
        }
    }
    

    return (
        <form className="flex flex-col justify-center items-center gap-2 w-full max-w-7xl px-4 md:px-10" onSubmit={handleSubmit}>
            <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                placeholder="Nome do Produto"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <textarea
                name="productDescription"
                value={product.productDescription}
                onChange={handleChange}
                placeholder="Descrição"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black resize-none placeholder:opacity-75 outline-none"
            />
            <input
                type="text"
                name="summary"
                value={product.summary}
                onChange={handleChange}
                placeholder="Resumo"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <input
                type="text"
                name="manufacturer"
                value={product.manufacturer}
                onChange={handleChange}
                placeholder="Fabricante"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <input
                type="text"
                name="brandName"
                value={product.brandName}
                onChange={handleChange}
                placeholder="Marca"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <button className="w-50 border-2 py-2 px-6 rounded-lg bg-black text-white cursor-pointer">{initialProduct? "Salvar" : "Cadastrar"}</button>

            {message && (
                <p className="text-sm mt-2 text-black-700">{message}</p>
            )}

        </form>
    )
}