import Footer from "@/components/footer";
import Header from "@/components/header";

import phoneImage from "../../public/product image.png";
import { useState } from "react";
import BaseButton from "@/components/ui/BaseButton";

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
            <Header />
            <h1 className="text-xl text-black text-center m-5">Seu carrinho</h1>
            <div className="flex justify-center m-5 gap-2">
                <div>
                    <table className="w-4xl overflow-y-auto min-h-96 max-h-96">
                        <thead>
                            <tr>
                                <th>{null}</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Preço</th>
                                <th>{null}</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {products.map(product => (
                                <tr key={product.productId}>
                                    <td><img src={product.image} alt="Fone de ouvido" className="w-20 h-20" /></td>
                                    <td className="text-center">{product.productName}</td>
                                    <td className="text-center">
                                        <button type="button" className="p-2">-</button>99<button type="button" className="p-2">+</button>
                                    </td>
                                    <td className="text-center">R$ {product.price}</td>
                                    <td className="text-center"><BaseButton bgColor="bg-red-700" hoverColor="hover:bg-red-800" onClick={() => handleDelete(product.productId)} >Remover</BaseButton></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-right text-lg pr-12">
                        {'Subtotal (6 produtos): R$ 203,63'}
                    </div>
                </div>
                <div>
                    <div className="p-5 rounded-lg flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <p>Subtotal: R$ 203,63</p>
                            <p>Descontos: R$ -2,87</p>
                            <p>Entrega: R$ 0,00</p>
                            <p>Total: R$ 203,63</p>
                        </div>
                        <div className="flex w-xs my-2">
                            <BaseButton bgColor="bg-green-600" hoverColor="hover:bg-green-700">Finalizar Pedido</BaseButton>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}