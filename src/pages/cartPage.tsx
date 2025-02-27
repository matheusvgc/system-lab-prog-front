import Footer from "@/components/footer";
import Header from "@/components/header";

import phoneImage from "../../public/product image.png";
import { useState } from "react";

const _products = [
    {
        productId: "1",
        productName: "Fone de ouvido",
        price: 110.90,
        image: phoneImage,
    },
    {
        productId: "2",
        productName: "Fone de ouvido",
        price: 110.90,
        image: phoneImage,
    },
    {
        productId: "3",
        productName: "Fone de ouvido",
        price: 110.90,
        image: phoneImage,
    },
    {
        productId: "4",
        productName: "Fone de ouvido",
        price: 110.90,
        image: phoneImage,
    },
    {
        productId: "5",
        productName: "Fone de ouvido",
        price: 110.90,
        image: phoneImage,
    },
    {
        productId: "6",
        productName: "Fone de ouvido",
        price: 110.90,
        image: phoneImage,
    }
]

export default function CartPage() {

    const [products, setProducts] = useState(_products);

    function handleDelete(productId: string) {
        setProducts(products.filter(product => product.productId !== productId));
    }

    return (
        <>
            <Header/>
            <h1 className="text-4xl text-black text-center m-5">Seu carrinho</h1>
            <div className="flex justify-center m-5 gap-2">
                <div>
                    <table className="w-4xl overflow-y-auto min-h-96 max-h-96">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Preço</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {products.map(product => (
                                <tr key={product.productId}>
                                    <td><img src={product.image} alt="Fone de ouvido" className="w-20 h-20"/></td>
                                    <td className="text-center">{product.productName}</td>
                                    <td className="text-center">
                                        <button className="p-2">-</button>99<button className="p-2">+</button>
                                    </td>
                                    <td className="text-center">R$ {product.price}</td>
                                    <td className="text-center"><button onClick={() => handleDelete(product.productId)} className="bg-red-400 rounded-lg p-2 cursor-pointer">Remover</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-5 text-right text-2xl">
                        Subtotal: R$ 203,63
                    </div>
                </div>
                <div>
                    <div className="bg-gray-200 p-5 rounded-lg">
                        <div className="flex flex-col gap-2">
                            <p>Subtotal: R$ 203,63</p>
                            <p>Descontos: R$ -2,87</p>
                            <p>Entrega: R$ 0,00</p>
                            <p>Total: R$ 203,63</p>
                        </div>
                        <div className="flex justify-center w-xs my-2">
                            <button className="bg-green-400 rounded-lg p-2 cursor-pointer">Finalizar pedido</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}