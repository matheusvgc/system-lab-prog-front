import Header from "@/components/header";
import EvaluationCard from "@/components/productComponents/EvaluationCard";
// import EvaluationStars from "@/components/productComponents/EvaluationStars";
import SpecificationTable from "@/components/productComponents/SpecificationTable";
import BaseButton from "@/components/ui/BaseButton";
import { IProduct } from "@/dataInterfaces/IProduct";
import { IReview } from "@/dataInterfaces/IReview";
import { useAlert } from "@/hooks/useAlert";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { getErrorMessage } from "@/utils/errorHandler";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product() {

    const { user } = useAuth();
    const { createAlert } = useAlert()

    const [loadingAddCart, setLoadingAddCart] = useState(false)
    const [loadingGetProduct, setLoadingGetProduct] = useState(true)

    const { productId } = useParams();
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        fetchProduct();
    }, []);

    async function fetchProduct() {

        try {
            const response = await api.get(`/productSku/${productId}`);
            setProduct(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingGetProduct(false)
        }
    }

    async function addToCard() {
        console.log('chegou na funcao')
        setLoadingAddCart(true)
        try {
            const response = await api.post(`/carts/addItemToCart/${user?.cart?.cartId}`, {
                productSkuId: productId,
                quantity: 1
            });
            createAlert('Item Inserido com Sucesso', 'success')
        } catch (err: any) {
            console.log('errror', err)
            createAlert(getErrorMessage(err.response?.data?.message), "error")
            console.error(err);
        } finally {
            setLoadingAddCart(false)
        }
    }

    return (
        <>
            <Header />
            <main className="px-[5%] flex flex-col gap-8">
                {loadingGetProduct ?
                    <div className="flex items-center justify-center h-screen"><CircularProgress size={100} color={'inherit'} /></div>
                    :
                    <><section className="flex flex-row items-center justify-center gap-16 pt-8">
                        <img src="smartphone.jpg" alt="" width={150} />
                        <div className="flex flex-col gap-4">
                            <p>{product?.product.productName}</p>
                            {product?.price && <p>R$ {(product?.price / 100).toFixed(2)}</p>}
                            {/* <EvaluationStars /> */}
                            <p>Quantidade</p>
                            <BaseButton loading={loadingAddCart} onClick={addToCard}>Adicionar ao Carrinho</BaseButton>
                        </div>
                    </section>
                        <section className="flex flex-col gap-8">
                            <h1 className="text-center text-xl">Descrição do Produto</h1>
                            <p>{product?.product.productDescription}</p>

                        </section>
                        <section className="flex flex-col gap-8">
                            <h1 className="text-center text-xl">Detalhes técnicos</h1>
                            <div className="sm:w-1/2">
                                <SpecificationTable />
                            </div>

                        </section>
                        <section className="flex flex-col gap-8 pb-8">
                            <h1 className="text-center text-xl">Avaliações</h1>
                            {product?.product.reviews.map((productReview: IReview) => (
                                <EvaluationCard key={productReview.reviewId} review={productReview} />
                            ))}
                        </section></>}

            </main>
        </>
    )
}