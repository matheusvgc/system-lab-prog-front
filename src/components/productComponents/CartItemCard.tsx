import { formatPrice } from "@/utils/formatPrice";
import BaseButton from "../ui/BaseButton";
import QuantityInput from "../ui/QuantityInput";
import { useState } from "react";
import api from "@/services/api";

interface Props {
    cartItem: any;
    handleDelete: (cartItemId: string) => Promise<void>;
    loadingRemoveCart: boolean;
}

export default function CartItemCard({ cartItem, handleDelete, loadingRemoveCart }: Props) {

    const [quantity, setQuantity] = useState<number>(cartItem.quantity);

    async function updateCartItemQuantity(value: number) {
        try {
            const response = await api.put(`/carts/updateQuantityOfCartItem/${cartItem.cartItemId}`, null, { 
                params: {
                quantity: quantity
              } });
            console.log(response)
        } catch (error) {
            console.error(error);
        } finally {
            setQuantity(value);
        }
    }

    return (
        <tbody key={cartItem.cartItemId}>
            <tr>
                <td><img src={cartItem.productSku.productImage} alt="Fone de ouvido" className="w-20 h-20" /></td>
                <td className="text-center">{cartItem.productSku.product.productName}</td>
                <td className="text-center">
                    <QuantityInput defaultValue={quantity} value={quantity} max={cartItem.productSku.stockQuantity} onChange={(value) => {
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
                    >Remover</BaseButton></td>
            </tr>
        </tbody>
    )
}
