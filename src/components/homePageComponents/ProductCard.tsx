
interface Iproduct {
    productId: string;
    productName: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

interface Props {
    product: Iproduct;
}

export default function ProductCard({product}: Props) {
    return (
        <div className="justify-self-center max-w-[250px] flex flex-col gap-2 p-4 cursor-pointer rounded-lg border-1 hover:bg-gray-300 text-center">
            <img className="w-[200px] h-[200px] rounded-lg mx-auto" src={product.image} alt="Imagem do produto" />
            <h2 className="text-xl">{product.productName}</h2>
            <p>{product.description}</p>
            <p>Preço: R$ {product.price}</p>
            <button className="mx-auto px-4 py-2 bg-gray-500 rounded-lg text-white cursor-pointer hover:bg-gray-400 hover:text-gray-100">Adicionar ao carrinho</button>
        </div>
    )
}
