import Header from "@/components/header";
import ChangePageButton from "@/components/homePageComponents/ChangePageButton";
import DropDownMenu from "@/components/homePageComponents/DropDownMenu";
import ProductCard from "@/components/homePageComponents/ProductCard";
import type { ICategory } from "@/dataInterfaces/ICategory";
import type { IProduct } from "@/dataInterfaces/IProduct";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";


export default function HomePage() {

    const itemsPerPage = 12;
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentProducts, setCurrentProducts] = useState<IProduct[]>([]);

    const [searchParams] = useSearchParams();

    const { userType } = useAuth()

    useEffect(() => {
        fetchCategories();
        if (userType === 'ADMIN') {
            window.location.reload()
        }
    }, [userType]);

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);


    useEffect(() => {
        const query = searchParams.get("query");
        if(query) {
            filterProductsBySearch(query);
        } else {
            setCurrentProducts(products);
        }
    }, [searchParams, products]);

    async function fetchProducts() {

        try {
            setLoading(true);
            const response = await api.get("/productSku", {
                params: {
                    page: currentPage,
                    size: itemsPerPage
                }
            });
            const products = response.data.content;

            setProducts(products);
            setNumberOfPages(response.data.totalPages);
            setCurrentProducts(products.slice(0, itemsPerPage));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    async function fetchCategories() {
        try {
            const response = await api.get("/categories");
            const categories = response.data;
            setCategories(categories);
        } catch (error) {
            console.error(error);
        }
    }

    function changePage(page: number) {
        if (page >= numberOfPages || page < 0) return;

        setCurrentPage(page);
    }

    function filterProductsByCategory(value: string) {
        setCurrentProducts(products.filter(product => product.product.category.categoryName === value));
    }

    function filterProductsBySearch(term: string) {
        if (!term) {
            setCurrentProducts(products);
            return;
        }
    
        const filteredProducts = products.filter(product =>
            product.product.productName.toLowerCase().includes(term.toLowerCase())
        );
    
        setCurrentProducts(filteredProducts);
    }
    

    function sortProducts(value: string) {
        const sortedProducts = [...currentProducts];

        if (value === "greaterPrice") {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (value === "lowerPrice") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (value === "ascAlphabetical") {
            sortedProducts.sort((a, b) => a.product.productName.localeCompare(b.product.productName));
        } else if (value === "descAlphabetical") {
            sortedProducts.sort((a, b) => b.product.productName.localeCompare(a.product.productName));
        }

        setCurrentProducts(sortedProducts);
    }

    return (
        <>
            <Header />
            {/* <CategoriesMenu /> */}
            <div className="w-full bg-gray-100 pb-10 flex flex-col justify-center items-center">

                <h1 className="text-center text-4xl p-8">Nossos produtos</h1>
                <ul className="flex flex-row justify-center gap-10">
                    <DropDownMenu title={"Categorias"}>
                        <li className="py-2 hover:text-gray-500" onClick={() => setCurrentProducts(products.slice(0, itemsPerPage))}>Todos</li>
                        {categories.map((category) => (
                            <li key={category.categoryId} className="py-2 hover:text-gray-500" onClick={() => filterProductsByCategory(category.categoryName)}>
                                {category.categoryName}
                            </li>
                        ))}
                    </DropDownMenu>
                    <DropDownMenu title="Ordenar por">
                        <li className="py-2 hover:text-gray-500" onClick={() => sortProducts("greaterPrice")}>Maior preço</li>
                        <li className="py-2 hover:text-gray-500" onClick={() => sortProducts("lowerPrice")}>Menor preço</li>
                        <li className="py-2 hover:text-gray-500" onClick={() => sortProducts("ascAlphabetical")}>Alfabetico Ascendente</li>
                        <li className="py-2 hover:text-gray-500" onClick={() => sortProducts("descAlphabetical")}>Alfabetico Descendente</li>
                    </DropDownMenu>
                </ul>

                {loading ? (
                    <CircularProgress size={100} color={'inherit'} />
                ) : (
                    <div className="w-full my-2 max-w-7xl px-8 grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4">
                        {currentProducts.map(product => (
                            <ProductCard key={product.productSkuId} product={product} />
                        ))}
                    </div>
                )}

                <div className="flex justify-center gap-2">
                    <ChangePageButton icon="<-" changePage={() => changePage(currentPage - 1)} />
                    {Array.from({ length: numberOfPages }).map((_, index) => (
                        <ChangePageButton key={index} icon={(index + 1).toString()} changePage={() => changePage(index)} />
                    ))}
                    <ChangePageButton icon="->" changePage={() => changePage(currentPage + 1)} />
                </div>

            </div>
        </>
    )
}
