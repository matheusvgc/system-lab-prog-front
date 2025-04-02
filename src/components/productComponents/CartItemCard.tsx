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
            }});
            
        } catch (error) {
            createAlert(getErrorMessage(error), "error");
        } finally {
            setLoadingUpdateCartItemQuantity(false);
            setQuantity(value);
        }
    }

    return (
        <tbody key={cartItem.cartItemId}>
            <tr>
                <td><img src={cartItem.productSku.productImage} alt="Fone de ouvido" className="w-20 h-20" /></td>
                <td className="text-center">{cartItem.productSku.product.productName}</td>
                <td className="text-center">
                    <QuantityInput 
                    defaultValue={quantity} 
                    value={quantity}
                    max={cartItem.productSku.stockQuantity} 
                    loading={loadingUpdateCartItemQuantity}
                    onChange={(value) => {
                        if (value !== null) {
                            updateCartItemQuantity(value);
                        }
                    }}/>
                </td>
                <td className="text-center">R$ {formatPrice(cartItem.productSku.price)}</td>
                <td className="text-center">
                    <BaseButton
                    bgColor="bg-red-700" 
                    hoverColor="hover:bg-red-800" 
                    onClick={() => handleDelete(cartItem.cartItemId)}
                    loading={loadingRemoveCart}
                    >Remover</BaseButton>
                </td>
            </tr>
        </tbody>
    )
}
