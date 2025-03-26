import Header from "@/components/header";

import BaseButton from "@/components/ui/BaseButton";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { formatPrice } from "@/utils/formatPrice";

import { FaTrash } from "react-icons/fa";

export default function CartPage() {

    const { user } = useAuth();

    async function handleDelete(cartItemId: string) {
        try {
            await api.post(`/carts/removeItemFromCart/${user.cart.cartId}/${cartItemId}` , )
        } catch (error) {
            console.error(error);
        }
    }

    async function clearCart() {
        try {
            await api.post(`/carts/clearCart/${user.cart.cartId}`);
        } catch (error) {
            console.error(error);
        }
    }

    async function doOrder() {
        try {
            await api.post(`/orders/${user.userId}`);
        } catch (error) {
            console.error(error);
        }
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
                        {user.cart?.cartItems.length > 0 ? 
                        user.cart?.cartItems.map((cartItem: any) => (
                            <tbody key={cartItem.cartItemId}>
                                <tr>
                                    <td><img src={cartItem.productSku.productImage} alt="Fone de ouvido" className="w-20 h-20" /></td>
                                    <td className="text-center">{cartItem.productSku.product.productName}</td>
                                    <td className="text-center">
                                        <button type="button" className="p-2">-</button>99<button type="button" className="p-2">+</button>
                                    </td>
                                    <td className="text-center">R$ {formatPrice(cartItem.productSku.price)}</td>
                                    <td className="text-center"><BaseButton bgColor="bg-red-700" hoverColor="hover:bg-red-800" onClick={() => handleDelete(cartItem.cartItemId)} >Remover</BaseButton></td>
                                </tr>
                            </tbody>
                        )) : (
                            <tbody>
                                <tr>
                                    <td colSpan={5} className="text-center py-4">
                                        O Carrinho está vazio!
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                    <div className="text-right text-lg pr-12">
                        {`Subtotal (6 produtos): R$ ${formatPrice(user.cart?.total)}`}
                        <button className="text-red-500 hover:text-red-700" onClick={clearCart}> 
                            <FaTrash size={20}/>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="p-5 rounded-lg flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <p>Subtotal: R$ {formatPrice(user.cart?.total)}</p>
                            <p>Descontos: R$ 0.00</p>
                            <p>Entrega: R$ 0.00</p>
                            <p>Total: R$ {formatPrice(user.cart?.total)}</p>
                        </div>
                        <div className="flex w-xs my-2">
                            <BaseButton bgColor="bg-green-600" hoverColor="hover:bg-green-700" onClick={doOrder}>Finalizar Pedido</BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}