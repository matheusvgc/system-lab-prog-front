import CategoriesMenu from "@/components/categoriesMenu";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ChangePageButton from "@/components/homePageComponents/ChangePageButton";
// import DropDownMenu from "@/components/homePageComponents/DropDownMenu"
import ProductCard from "@/components/homePageComponents/ProductCard";
import { useEffect, useState } from "react"

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
    {
        productId: "7",
        productName: "g Nome do produto",
        price: 99.99,
        image: "../../product image.png",
        description: "Descrição do produto",
        category: "headphones"
    },
    {
        productId: "8",
        productName: "h Nome do produto",
        price: 98.99,
        image: "../../product image.png",
        description: "Descrição do produto",
        category: "headphones"
    },
    {
        productId: "9",
        productName: "i Nome do produto",
        price: 97.99,
        image: "../../product image.png",
        description: "Descrição do produto",
        category: "headphones"
    },
    {
        productId: "10",
        productName: "j Nome do produto",
        price: 96.99,
        image: "../../smartphone.jpg",
        description: "Descrição do produto",
        category: "smartphones"
    },
    {
        productId: "11",
        productName: "k Nome do produto",
        price: 95.99,
        image: "../../smartphone.jpg",
        description: "Descrição do produto",
        category: "smartphones"
    },
    {
        productId: "12",
        productName: "l Nome do produto",
        price: 93.99,
        image: "../../smartphone.jpg",
        description: "Descrição do produto",
        category: "smartphones"
    },
    {
        productId: "13",
        productName: "m Nome do produto",
        price: 97.99,
        image: "../../product image.png",
        description: "Descrição do produto",
        category: "headphones"
    },
    {
        productId: "14",
        productName: "n Nome do produto",
        price: 96.99,
        image: "../../smartphone.jpg",
        description: "Descrição do produto",
        category: "smartphones"
    },
    {
        productId: "15",
        productName: "o Nome do produto",
        price: 95.99,
        image: "../../smartphone.jpg",
        description: "Descrição do produto",
        category: "smartphones"
    },
    {
        productId: "16",
        productName: "p Nome do produto",
        price: 93.99,
        image: "../../smartphone.jpg",
        description: "Descrição do produto",
        category: "smartphones"
    },
]

export default function HomePage() {

    const [products, setProducts] = useState<Iproduct[]>(_products);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    useEffect(() => {
        setProducts(_products.slice(12 * (page - 1), 12 * page));
        setNumberOfPages(Math.ceil(_products.length / 12));
    }, []);

    function changePage(_page: number) {
        if (_page > numberOfPages || _page <= 0) return;
        setPage(_page);
        setProducts(_products.slice((_page - 1) * 12, _page * 12));
    }

    // function filterProductsByCategory(value: string) {
    //     setProducts(_products.filter(product => product.category === value));
    // }

    // function sortProducts(value: string) {
    //     const sortedProducts = [...products];

    //     if (value === "greaterPrice") {
    //         sortedProducts.sort((a, b) => b.price - a.price);
    //     } else if (value === "lowerPrice") {
    //         sortedProducts.sort((a, b) => a.price - b.price);
    //     } else if (value === "ascAlphabetical"){
    //         sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
    //     } else if (value === "descAlphabetical") {
    //         sortedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
    //     }

    //     setProducts(sortedProducts);
    // }

    return (
        <>
        <Header/>
        <CategoriesMenu />
        <div className="w-full bg-gray-100 pb-10 flex flex-col justify-center items-center">
            <h1 className="text-center text-4xl p-8">Nossos produtos</h1>
            {/* <ul className="flex flex-row justify-center gap-10">
                <DropDownMenu title={"Categorias"}>
                    <li className="py-2 hover:text-gray-500" onClick={() => setProducts(_products.slice(0, 10))}>Todos</li>
                    <li className="py-2 hover:text-gray-500" onClick={() => filterProductsByCategory("headphones")}>Fone de ouvido</li>
                    <li className="py-2 hover:text-gray-500" onClick={() => filterProductsByCategory("smartphones")}>Smartphone</li>
                </DropDownMenu>
                <DropDownMenu title="Marcas">
                    <li className="py-2 hover:text-gray-500">Todos</li>
                    <li className="py-2 hover:text-gray-500">JBL</li>
                    <li className="py-2 hover:text-gray-500">Samsung</li>
                </DropDownMenu>
                <DropDownMenu title="Ordenar por">
                    <li className="py-2 hover:text-gray-500" onClick={() => sortProducts("greaterPrice")}>Maior preço</li>
                    <li className="py-2 hover:text-gray-500" onClick={() => sortProducts("lowerPrice")}>Menor preço</li>
                    <li className="py-2 hover:text-gray-500" onClick={() => sortProducts("ascAlphabetical")}>Alfabetico Ascendente</li>
                    <li className="py-2 hover:text-gray-500" onClick={() => sortProducts("descAlphabetical")}>Alfabetico Descendente</li>
                </DropDownMenu>
            </ul> */}

            <div className="w-full max-w-7xl px-8 grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4">
                {products.map(product => (
                    <ProductCard key={product.productId} product={product}/>
                ))}
            </div>

            <div className="flex justify-center gap-2">
                <ChangePageButton icon="<-" changePage={() => changePage(page - 1)}/>
                {Array.from({ length: numberOfPages }).map((_, index) => (
                    <ChangePageButton icon={(index + 1).toString()} changePage={() => changePage(index + 1)}/>
                ))}
                <ChangePageButton icon="->" changePage={() => changePage(page + 1)}/>
            </div>
        </div>
        <Footer/>
        </>
    )
}
