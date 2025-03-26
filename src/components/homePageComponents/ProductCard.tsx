import { IProduct } from "@/dataInterfaces/IProduct";
import { formatPrice } from "@/utils/formatPrice";
import { useNavigate } from "react-router-dom";

interface Props {
    product: IProduct;
}

export default function ProductCard({ product }: Props) {

    const navigate = useNavigate();
    function toProduct() {
        navigate("/product/" + product.productSkuId);
    }

    return (
        <div onClick={toProduct} className="justify-self-center max-w-[250px] flex flex-col gap-2 p-4 cursor-pointer rounded-lg border-1 hover:bg-gray-300 text-center">
            <img className="w-[200px] h-[200px] rounded-lg mx-auto" src={product.productImage} alt="Imagem do produto" />
            <h2 className="text-xl min-h-2">{product.product?.productName || "undefined"}</h2>
            <div className="flex flex-col justify-around min-h-22">
                <p>{product.product?.summary || "undefined"}</p>
                <p>Preço: R$ {formatPrice(product.price) || "undefined"}</p>
            </div>
            <button className="mx-auto px-4 py-2 bg-gray-500 rounded-lg text-white cursor-pointer hover:bg-gray-400 hover:text-gray-100">Ver Detalhes</button>
        </div>
    )
}
