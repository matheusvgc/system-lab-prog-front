import api from "@/services/api";
import { useEffect, useState } from "react";

export interface ProductData {
    productName: string;
    productDescription: string;
    summary: string;
    manufacturer: string;
    brandName: string;
    category?: CategoryData;
}

interface ProductFormProps {
    onSubmit: (product: ProductData) => Promise<{ success: boolean; message: string }>;
    initialProduct?: ProductData;
}

interface CategoryData {
    categoryId: string;
    categoryName: string;
    categoryDescription: string;
}

export default function ProductForm({ onSubmit, initialProduct }: ProductFormProps) {

    const [categories, setCategories] = useState<CategoryData[]>([]);


    const [message, setMessage] = useState<string | null>(null);
    const [product, setProduct] = useState<ProductData>({
        productName: "",
        productDescription: "",
        summary: "",
        manufacturer: "",
        brandName: "",
        category: { categoryId: "", categoryName: "", categoryDescription: "" }
    })

    useEffect(() => {
        if (initialProduct) {
            setProduct(initialProduct);
        }
    }, [initialProduct])

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const response = await api.get("/categories");
            setCategories(response.data.content);
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setProduct({ ...product, [e.target.name]: e.target.value, });
    }

    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedCategory = categories.find(cat => cat.categoryId === e.target.value);
        setProduct({ ...product, category: selectedCategory || { categoryId: "", categoryName: "", categoryDescription: "" } });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();



        await onSubmit(product);



        setTimeout(() => setMessage(null), 3000);

        if (!initialProduct) {
            setProduct({
                productName: "",
                productDescription: "",
                summary: "",
                manufacturer: "",
                brandName: "",
                category: { categoryId: "", categoryName: "", categoryDescription: "" }
            });
        }
    }


    return (
        <form className="flex flex-col justify-center items-center gap-2 w-full max-w-7xl px-4 md:px-10" onSubmit={handleSubmit}>
            <input
                required
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                placeholder="Nome do Produto"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <textarea
                required
                name="productDescription"
                value={product.productDescription}
                onChange={handleChange}
                placeholder="Descrição"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black resize-none placeholder:opacity-75 outline-none"
            />
            <input
                required
                type="text"
                name="summary"
                value={product.summary}
                onChange={handleChange}
                placeholder="Resumo"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <input
                required
                type="text"
                name="manufacturer"
                value={product.manufacturer}
                onChange={handleChange}
                placeholder="Fabricante"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <input
                required
                type="text"
                name="brandName"
                value={product.brandName}
                onChange={handleChange}
                placeholder="Marca"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <select
                required
                name="categoryId"
                value={product.category?.categoryId}
                onChange={handleCategoryChange}
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                ))}
            </select>
            <button className="w-50 border-2 py-2 px-6 rounded-lg bg-black text-white cursor-pointer">{initialProduct ? "Salvar" : "Cadastrar"}</button>

            {message && (
                <p className="text-sm mt-2 text-black-700">{message}</p>
            )}

        </form>
    )
}