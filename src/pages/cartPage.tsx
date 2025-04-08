import Header from "@/components/header";
import CartItemCard from "@/components/productComponents/CartItemCard";

import BaseButton from "@/components/ui/BaseButton";
import { useAlert } from "@/hooks/useAlert";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { getErrorMessage } from "@/utils/errorHandler";
import { formatPrice } from "@/utils/formatPrice";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
export type CartItem = {
    cartItemId: string;
    productSku: {
        price: number;
        product: {
            productId: string;
            productImage: string;
            productName: string;
            productDescription: string;
            category: any; // ou um tipo mais específico, se tiver
            reviews: any[]; // ou um tipo mais específico
        };
        productSkuId: string;
        sku: string;
        stockQuantity: number;
    };
    quantity: number;
};


export default function CartPage() {

    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const { createAlert } = useAlert();
    const [orderLoading, setOrderLoading] = useState(false);
    const [loadingRemoveCart, setLoadingRemoveCart] = useState(false);
    const [clearCartLoading, setClearCartLoading] = useState(false);
    const totalQuantity = useMemo(() => {
        if (!user?.cart?.cartItems || user.cart.cartItems.length === 0) return 0;

        return user.cart.cartItems.reduce(
            (total: number, item: CartItem) => total + item.quantity,
            0
        );
    }, [user?.cart?.cartItems]);


    async function handleDelete(cartItemId: string) {
        setLoadingRemoveCart(true);
        try {
            await api.post(`/carts/removeItemFromCart/${user.cart.cartId}/${cartItemId}`,);
            window.location.reload();
            createAlert("Item removido com sucesso!", "success");
        } catch (error) {
            createAlert(getErrorMessage(error), "error");
        } finally {
            setLoadingRemoveCart(false);
        }
    }

    async function clearCart() {
        setClearCartLoading(true);
        try {
            await api.post(`/carts/clearCart/${user.cart.cartId}`);
            window.location.reload();
            createAlert("Carrinho limpo com sucesso!", "success");
        } catch (error) {
            createAlert(getErrorMessage(error), "error");
        } finally {
            setClearCartLoading(false);
        }
    }

    async function doOrder() {
        setOrderLoading(true);
        try {
            await api.post(`/orders/${user.userId}`, null, {
                params: {
                    status: "PENDENTE"
                }
            });
            createAlert("Pedido realizado com sucesso!", "success");
            clearCart();
            navigate("/home");
        } catch (error: any) {
            createAlert(error.response?.data?.message, "error");
        } finally {
            setOrderLoading(false);

        }
    }

    return (
        <>
            <Header />
            {!loading ? (
                <>
                    <h1 className="text-xl text-black text-center m-5">Seu carrinho</h1>
                    <div className="flex justify-center mx-5 gap-2 flex-col items-center">
                        <div className="flex flex-col gap-2 items-center md:flex-row">
                            <table className="w-4xl overflow-y-auto min-h-96 max-h-96 ">
                                <thead className=" hidden">
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
                                        <CartItemCard
                                            key={cartItem.cartItemId}
                                            cartItem={cartItem}
                                            handleDelete={handleDelete}
                                            loadingRemoveCart={loadingRemoveCart}
                                        />
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
                            <div>
                                <div className="flex flex-col gap-2 items-center">
                                    <span className="mx-2">{`Subtotal (${totalQuantity || 0} produtos):`} </span>
                                    <div className="flex flex-row gap-2 items-center">
                                        <span className="flex gap-5 ">{`R$ ${formatPrice(user.cart?.total)}`}</span>

                                        <BaseButton
                                            bgColor="bg-red-700"
                                            hoverColor="hover:bg-red-800"
                                            onClick={() => clearCart()}
                                            loading={clearCartLoading}
                                        ><FaTrash size={20} /></BaseButton>
                                    </div>
                                    <div className="p-5 rounded-lg flex flex-col gap-4 items-center">
                                        <div className="flex flex-col gap-2">
                                            {/* <p>Subtotal: R$ {formatPrice(user.cart?.total)}</p> */}
                                            <p>Descontos: R$ 0.00</p>
                                            <p>Entrega: R$ 0.00</p>
                                            <p>Total: R$ {formatPrice(user.cart?.total)}</p>
                                        </div>
                                        <div>
                                            <BaseButton
                                                bgColor="bg-green-600"
                                                hoverColor="hover:bg-green-700"
                                                onClick={doOrder}
                                                loading={orderLoading}
                                            >Finalizar Pedido</BaseButton>
                                        </div>
                                    </div>
                                </div>



                            </div>

                        </div>

                    </div>
                </>
            ) : (
                <div className="text-center">
                    <CircularProgress size={100} color={'inherit'} />
                </div>
            )
            }

        </>
    )
}