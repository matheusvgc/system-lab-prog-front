import Header from "@/components/header"


export default function OrderPage() {
    return (
        <>
            <Header/>
            <h1>Pedido</h1>
            <div>
                <p>Pedido #order.id</p>
                <p>Status: order.status</p>
                <p>Data: formatDate(order.createdAt)</p>
                <p>Total: R$ order.total</p>
            </div>
        </>
    )
}

