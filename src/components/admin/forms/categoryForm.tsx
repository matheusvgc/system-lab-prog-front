import { useEffect, useState } from "react";

export interface CategoryData {
    categoryName: string;
    categoryDescription: string;
}

interface CategoryFormProps {
    onSubmit: (category: CategoryData) => Promise<{ success: boolean; message: string }>;
    initialCategory?: CategoryData;
}

export default function CategoryForm ( { onSubmit, initialCategory } : CategoryFormProps ) {

    const [ message, setMessage ] = useState<string | null>(null);
    const [ category, setCategory] = useState<CategoryData>({
        categoryName: "",
        categoryDescription: "",
    })

    useEffect(() => {
        if (initialCategory) {
            setCategory(initialCategory);
        }
    }, [initialCategory])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCategory({...category, [e.target.name]: e.target.value,});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const response = await onSubmit(category);
    
        if (response && response.message) {
            setMessage(response.message);
        } else {
            setMessage("Erro desconhecido.");
        }
    
        setTimeout(() => setMessage(null), 3000);
    
        if (!initialCategory) {
            setCategory({
                categoryName: "",
                categoryDescription: "",
            });
        }
    }
    

    return (
        <form className="flex flex-col justify-center items-center gap-2 w-full max-w-7xl px-4 md:px-10" onSubmit={handleSubmit}>
            <input
                type="text"
                name="categoryName"
                value={category.categoryName}
                onChange={handleChange}
                placeholder="Categoria"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black placeholder:opacity-75 outline-none"
            />
            <textarea
                name="categoryDescription"
                value={category.categoryDescription}
                onChange={handleChange}
                placeholder="Descrição"
                className="border p-2 w-full border-2 rounded-lg border-black placeholder:text-black resize-none placeholder:opacity-75 outline-none"
            />
            <button className="w-50 border-2 py-2 px-6 rounded-lg bg-black text-white cursor-pointer">{initialCategory? "Salvar" : "Cadastrar"}</button>

            {message && (
                <p className="text-sm mt-2 text-black-700">{message}</p>
            )}

        </form>
    )
}