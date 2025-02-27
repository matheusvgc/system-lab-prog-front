import Footer from "@/components/footer";
import Header from "@/components/header";
import EvaluationCard from "@/components/productComponents/EvaluationCard";
import EvaluationStars from "@/components/productComponents/EvaluationStars";
import SpecificationTable from "@/components/productComponents/SpecificationTable";
import BaseButton from "@/components/ui/BaseButton";

export default function Product() {


    return (
        <>
            <Header />
            <main className="px-[5%] flex flex-col gap-8">
                <section className="flex flex-row items-center justify-center gap-16 pt-8">
                    <img src="smartphone.jpg" alt="" width={150} />
                    <div className="flex flex-col gap-4">
                        <p>Iphone 14 Pro Max</p>
                        <EvaluationStars />
                        <p>R$5.999,00</p>
                        <p>Quantidade</p>
                        <BaseButton>Adicionar ao Carrinho</BaseButton>
                    </div>
                </section>
                <section className="flex flex-col gap-8">
                    <h1 className="text-center text-xl">Descrição do Produto</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente molestias sit qui mollitia. Aperiam est commodi nulla iure officia iusto dolores rerum, in quisquam delectus, obcaecati illo ipsum earum optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ipsa animi reiciendis corporis obcaecati impedit distinctio eveniet reprehenderit, nobis accusamus voluptates deleniti velit voluptatem ducimus repudiandae dolorem? Consequuntur, cupiditate. Expedita!</p>

                </section>
                <section className="flex flex-col gap-8">
                    <h1 className="text-center text-xl">Detalhes técnicos</h1>
                    <div className="sm:w-1/2">
                        <SpecificationTable />
                    </div>

                </section>
                <section className="flex flex-col gap-8 pb-8">
                    <h1 className="text-center text-xl">Avaliações</h1>
                    <EvaluationCard />
                    <EvaluationCard />
                    <EvaluationCard />
                </section>
            </main>
            <Footer />
        </>
    )
}