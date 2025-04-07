import { BaseModal } from "@/components/BaseModal";
import Header from "@/components/header";
import EvaluationCard from "@/components/productComponents/EvaluationCard";
import EvaluationStars from "@/components/productComponents/EvaluationStars";
// import EvaluationStars from "@/components/productComponents/EvaluationStars";
import SpecificationTable from "@/components/productComponents/SpecificationTable";
import BaseButton from "@/components/ui/BaseButton";
import QuantityInput from "@/components/ui/QuantityInput";
import type { IProduct } from "@/dataInterfaces/IProduct";
import type { IReview } from "@/dataInterfaces/IReview";
import { useAlert } from "@/hooks/useAlert";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { getErrorMessage } from "@/utils/errorHandler";
import { CircularProgress, InputLabel, Stack, TextField } from "@mui/material";
import { Field } from "formik";
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
    const [loadingCommet, setLoadingCommet] = useState<boolean>(false)
    const [loadingAddCart, setLoadingAddCart] = useState(false)
    const [loadingGetProduct, setLoadingGetProduct] = useState(true)
    const [ratingValue, setRatingValue] = useState<number | null>(0);
    const [quantity, setQuantity] = useState<number>(1);
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

        } catch (err) {
            console.error(err);
        } finally {
            setLoadingGetProduct(false)
        }
    }
    const handleCreateComment = async (fields: any) => {
        const dataFields = {
            ...fields,
            stars: ratingValue
        }
        setLoadingCommet(true)
        try {
            await api.post(`product/addComment/${product?.product?.productId}/${user?.userId}`, dataFields);
            fetchProduct()
            createAlert('Item Inserido com Sucesso', 'success')
            setModal('')
        } catch (err: any) {

            createAlert(getErrorMessage(err), "error")
            console.error(err);
        } finally {
            setLoadingCommet(false)
        }
    }
    async function addToCard() {
        setLoadingAddCart(true)
        try {
            await api.post(`/carts/addItemToCart/${user?.cart?.cartId}`, {
                productSkuId: productId,
                quantity: quantity
            });
            createAlert('Item Inserido com Sucesso', 'success')
        } catch (err: any) {

            createAlert(getErrorMessage(err.response?.data?.message), "error")
            console.error(err);
        } finally {
            setLoadingAddCart(false)
        }
    }


    const handleCloseModal = () => {
        setModal('')
        setRatingValue(0)
    }

    const handleRatingChange = (newValue: number | null) => {

        setRatingValue(newValue);
    };

    const handleQuantityChange = (value: number) => {
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
                            <QuantityInput value={quantity} max={product?.stockQuantity} onChange={(value) => {
                                    if (value !== null) {
                                        handleQuantityChange(value);
                                    }
                                }} />
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

            <BaseModal loading={loadingCommet} open={modal === 'insert'} onClose={handleCloseModal} onSubmit={handleCreateComment}>
                <Stack direction="column" gap={1} pt={1}>



                    <InputLabel
                        sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: 'black',
                            mb: 1
                        }}
                    >
                        Título
                    </InputLabel>
                    <Field
                        name="title"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        required
                    />

                    <InputLabel
                        sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: 'black',
                            mb: 1
                        }}
                    >
                        Descrição
                    </InputLabel>
                    <Field
                        name="comment"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        required
                        multiline
                        rows={4}
                    />

                    <EvaluationStars editable onChange={handleRatingChange} />

                </Stack>
            </BaseModal>
        </>
    )
}