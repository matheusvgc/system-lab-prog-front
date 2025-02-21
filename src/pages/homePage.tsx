import DropDownMenu from "@/components/homePageComponents/DropDownMenu"
import { useState } from "react"

interface Iproduct {
    productId: string;
    productName: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

const _products = [
    {
        productId: "1",
        productName: "a Nome do produto",
        price: 99.99,
        image: "../../product image.png",
        description: "Descrição do produto",
        category: "headphones"
    },
    {
        productId: "2",
        productName: "b Nome do produto",
        price: 98.99,
        image: "../../product image.png",
        description: "Descrição do produto",
        category: "headphones"
    },
    {
        productId: "3",
        productName: "c Nome do produto",
        price: 97.99,
        image: "../../product image.png",
        description: "Descrição do produto",
        category: "headphones"
    },
    {
        productId: "4",
        productName: "d Nome do produto",
        price: 96.99,
        image: "../../smartphone.jpg",
        description: "Descrição do produto",
        category: "smartphones"
    },
    {
        productId: "5",
        productName: "e Nome do produto",
        price: 95.99,
        image: "../../smartphone.jpg",
        description: "Descrição do produto",
        category: "smartphones"
    },
    {
        productId: "6",
        productName: "f Nome do produto",
        price: 93.99,
        image: "../../smartphone.jpg",
        description: "Descrição do produto",
        category: "smartphones"
    },
]

export default function HomePage() {

    const [products, setProducts] = useState<Iproduct[]>(_products);

    function filterProductsByCategory(value: string) {
        setProducts(_products.filter(product => product.category === value));
    }

    function sortProducts(value: string) {
        const sortedProducts = [..._products];

        if (value === "greaterPrice") {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (value === "lowerPrice") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (value === "ascAlphabetical"){
            sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
        } else if (value === "descAlphabetical") {
            sortedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
        }

        setProducts(sortedProducts);
    }

    return (
        <div className="bg-gray-100 pb-10">
            <h1 className="text-center text-4xl p-10">Nossos produtos</h1>
            <ul className="flex flex-row justify-center gap-10">
                <DropDownMenu title={"Categorias"}>
                    <li className="py-2" onClick={() => setProducts(_products)}>Todos</li>
                    <li className="py-2" onClick={() => filterProductsByCategory("headphones")}>Fone de ouvido</li>
                    <li className="py-2" onClick={() => filterProductsByCategory("smartphones")}>Smartphone</li>
                </DropDownMenu>
                <DropDownMenu title="Marcas">
                    <li className="py-2">Todos</li>
                    <li className="py-2">JBL</li>
                    <li className="py-2">Samsung</li>
                </DropDownMenu>
                <DropDownMenu title="Ordenar por">
                    <li className="py-2" onClick={() => sortProducts("greaterPrice")}>Maior preço</li>
                    <li className="py-2" onClick={() => sortProducts("lowerPrice")}>Menor preço</li>
                    <li className="py-2" onClick={() => sortProducts("ascAlphabetical")}>Alfabetico Ascendente</li>
                    <li className="py-2" onClick={() => sortProducts("descAlphabetical")}>Alfabetico Descendente</li>
                </DropDownMenu>
            </ul>

            <div className="w-7xl mx-auto my-10 p-10 flex flex-wrap gap-10 border-black-500 border-2">
            {products.map(product => (
                <div key={product.productId}>
                    <img className="w-[200px] h-[200px]" src={product.image} alt="Imagem do produto" />
                    <h2>{product.productName}</h2>
                    <p>{product.description}</p>
                    <p>Preço: {product.price}</p>
                    <button>Comprar</button>
                </div>
            ))}
                
            </div>
        </div>
    )
}
