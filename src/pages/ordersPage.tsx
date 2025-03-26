import Footer from "@/components/footer";
import Header from "@/components/header";
import useAuth from "@/hooks/useAuth"
import { Link } from "react-router-dom";
// import { CircularProgress } from "@mui/material";
// import { useState } from "react";

export default function OrdersPage() {

    const { user } = useAuth();

    return (
        <>
            <Header/>
            <div className="m-3 md:mx-20">
                <h1 className="text-4xl text-center">Seus pedidos</h1>
                <div className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                    <div>
                        <p>Pedido #order.id</p>
                        <p>Status: order.status</p>
                        <p>Data: formatDate(order.createdAt)</p>
                        <p>Total: R$ order.total</p>
                    </div>
                    <Link to="">Visualizar</Link>
                </div>
                <div className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                    <div>
                        <p>Pedido #order.id</p>
                        <p>Status: order.status</p>
                        <p>Data: formatDate(order.createdAt)</p>
                        <p>Total: R$ order.total</p>
                    </div>
                    <button>Visualizar</button>
                </div>
                <div className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                    <div>
                        <p>Pedido #order.id</p>
                        <p>Status: order.status</p>
                        <p>Data: formatDate(order.createdAt)</p>
                        <p>Total: R$ order.total</p>
                    </div>
                    <button>Visualizar</button>
                </div>
                <div className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                    <div>
                        <p>Pedido #order.id</p>
                        <p>Status: order.status</p>
                        <p>Data: formatDate(order.createdAt)</p>
                        <p>Total: R$ order.total</p>
                    </div>
                    <button>Visualizar</button>
                </div>
                <div className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                    <div>
                        <p>Pedido #order.id</p>
                        <p>Status: order.status</p>
                        <p>Data: formatDate(order.createdAt)</p>
                        <p>Total: R$ order.total</p>
                    </div>
                    <button>Visualizar</button>
                </div>
                <div className="border-b-2 border-primary min-h-20 p-4 gap-4 md:flex md:justify-between">
                    <div>
                        <p>Pedido #order.id</p>
                        <p>Status: order.status</p>
                        <p>Data: formatDate(order.createdAt)</p>
                        <p>Total: R$ order.total</p>
                    </div>
                    <button>Visualizar</button>
                </div>

            </div>

        </>
    )
}
