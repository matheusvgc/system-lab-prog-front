import { formatPrice } from "@/utils/formatPrice";
import BaseButton from "../ui/BaseButton";
import QuantityInput from "../ui/QuantityInput";
import { useState } from "react";
import api from "@/services/api";
import { useAlert } from "@/hooks/useAlert";
import { getErrorMessage } from "@/utils/errorHandler";

interface Props {
    cartItem: any;
    handleDelete: (cartItemId: string) => Promise<void>;
    loadingRemoveCart: boolean;
}

export default function CartItemCard({ cartItem, handleDelete, loadingRemoveCart }: Props) {

    const { createAlert } = useAlert();

    const [loadingUpdateCartItemQuantity, setLoadingUpdateCartItemQuantity] = useState(false);
    const [quantity, setQuantity] = useState<number>(cartItem.quantity);

    async function updateCartItemQuantity(value: number) {
        setLoadingUpdateCartItemQuantity(true);
        try {
            await api.put(`/carts/updateQuantityOfCartItem/${cartItem.cartItemId}`, null, {
                params: {
                    quantity: value
                }
            });

        } catch (error) {
            createAlert(getErrorMessage(error), "error");
        } finally {
            setLoadingUpdateCartItemQuantity(false);
            setQuantity(value);
        }
    }

    return (
        <tbody key={cartItem.cartItemId}>
            <tr className="flex flex-col sm:table-row border-b sm:border-0 mb-4 sm:mb-0">
                <td className="p-2 sm:table-cell flex items-center justify-center sm:justify-start">
                    <img src={cartItem.productSku.productImage} alt="Fone de ouvido" className="w-20 h-20" />
                </td>
                <td className="p-2 sm:table-cell text-center sm:text-left">
                    <span className="sm:hidden font-semibold">Produto: </span>
                    {cartItem.productSku.product.productName}
                </td>
                <td className="p-2 sm:table-cell text-center sm:text-left">
                    <span className="sm:hidden font-semibold">Quantidade: </span>
                    <QuantityInput
                        defaultValue={quantity}
                        value={quantity}
                        max={cartItem.productSku.stockQuantity}
                        loading={loadingUpdateCartItemQuantity}
                        onChange={(value) => {
                            if (value !== null) {
                                updateCartItemQuantity(value);
                            }
                        }}
                    />
                </td>
                <td className="p-2 sm:table-cell text-center sm:text-left">
                    <span className="sm:hidden font-semibold">Preço: </span>
                    R$ {formatPrice(cartItem.productSku.price)}
                </td>
                <td className="p-2 sm:table-cell text-center sm:text-left">

                    <BaseButton
                        bgColor="bg-red-700"
                        hoverColor="hover:bg-red-800"
                        onClick={() => handleDelete(cartItem.cartItemId)}
                        loading={loadingRemoveCart}
                    >
                        Remover
                    </BaseButton>
                </td>
            </tr>
        </tbody>


    )
}
