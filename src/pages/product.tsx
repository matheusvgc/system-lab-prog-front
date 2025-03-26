import { BaseModal } from "@/components/BaseModal";
import Header from "@/components/header";
import EvaluationCard from "@/components/productComponents/EvaluationCard";
// import EvaluationStars from "@/components/productComponents/EvaluationStars";
import SpecificationTable from "@/components/productComponents/SpecificationTable";
import BaseButton from "@/components/ui/BaseButton";
import QuantityInput from "@/components/ui/QuantityInput";
import { IProduct } from "@/dataInterfaces/IProduct";
import { IReview } from "@/dataInterfaces/IReview";
import { useAlert } from "@/hooks/useAlert";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { getErrorMessage } from "@/utils/errorHandler";
import { Box, CircularProgress, Input, Stack, Typography } from "@mui/material";
import { Form } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type ModalOptions =
    | ''
    | 'insert'
    | 'update'
    | 'delete'
    | 'groups'
    | 'modules'
    | 'opcoes-detalhe'
    | 'signature'
    | 'assinatura'
    | 'finalizar'
    | 'filter'

export default function Product() {

    const { user } = useAuth();
    const { createAlert } = useAlert()

    const [loadingAddCart, setLoadingAddCart] = useState(false)
    const [loadingGetProduct, setLoadingGetProduct] = useState(true)
    const [quantity, setQuantity] = useState<number | null>(1);
    const [modal, setModal] = useState<ModalOptions>('')

    const { productId } = useParams();
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        fetchProduct();
    }, []);



    async function fetchProduct() {

        try {
            const response = await api.get(`/productSku/${productId}`);
            setProduct(response.data);
            console.log('avaliacoes', response.data)
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingGetProduct(false)
        }
    }
    const handleCreateComment = async () => {
        console.log('criou')
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

    const handleQuantityChange = (value: number | null) => {
        console.log('Valor atual:', value);
        setQuantity(value);
    };

    return (
        <>
            <Header />
            <main className="px-[5%] flex flex-col gap-8">
                {loadingGetProduct ?
                    <div className="flex items-center justify-center h-screen"><CircularProgress size={100} color={'inherit'} /></div>
                    :
                    <><section className="flex flex-row items-center justify-center gap-16 pt-8">
                        <img src={product?.productImage} alt="" width={150} />
                        <div className="flex flex-col gap-4">
                            <p>{product?.product.productName}</p>
                            {product?.price && <p>R$ {(product?.price / 100).toFixed(2)}</p>}
                            {/* <EvaluationStars /> */}
                            <QuantityInput onChange={(value) => handleQuantityChange(value)} />
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
                            <div className="flex items-center justify-center gap-8"><h1>Comentários</h1><BaseButton onClick={() => setModal('insert')}>Adicionar Comentário</BaseButton></div>

                            {product?.product.reviews.map((productReview: IReview) => (
                                <EvaluationCard key={productReview.reviewId} review={productReview} />
                            ))}
                        </section></>}

            </main>

            <BaseModal loading={true} open={modal === 'insert'} onClose={() => setModal('')} onSubmit={handleCreateComment}>
                <Stack direction="column" gap={1} pt={1}>




                    <Input name="tema" type="text" required />
                    <Input name="compromisso_firmado" type="text" required />


                </Stack>
            </BaseModal>
        </>
    )
}