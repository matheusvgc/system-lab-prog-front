import { useState } from "react";

export interface ProductData {
    productName: string;
    productDescription: string;
    summary: string;
    manufacturer: string;
    brandName: string;
}

interface ProductFormProps {
    onSubmit: (product: ProductData) => void;
}

export default function ProductForm ( { onSubmit } : ProductFormProps ) {

    const [ product, setProduct ] = useState<ProductData>({
        productName: "",
        productDescription: "",
        summary: "",
        manufacturer: "",
        brandName: "",
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setProduct({...product, [e.target.name]: e.target.value,});
    }

    function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        onSubmit(product);

        setProduct({
            productName: "",
            productDescription: "",
            summary: "",
            manufacturer: "",
            brandName: "",
        });
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
            <button className="border-2 py-2 px-6 rounded-lg bg-black text-white cursor-pointer">Cadastrar</button>
        </form>
    )
}