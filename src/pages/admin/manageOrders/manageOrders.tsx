import OrdersTable from "@/components/admin/tables/ordersTable";
import Header from "@/components/header";

export default function ManageOrders() {

    return (
        <>
            <Header />
            <div className="w-full min-h-144 h-full flex flex-col justify-center items-center gap-6 py-10 px-4 md:px-10">
                <h1 className="text-2xl font-bold">Gestão de pedidos</h1>
                <OrdersTable/>
            </div>
        </>
    )
}
