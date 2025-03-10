
export default function Footer() {
    return (
        <footer className="bg-black text-white p-8 text-center text-xl">
            <div className="my-4">
                TECH SHOP &copy; 2022
            </div>
            <div className="md:flex md:gap-4 md:justify-center">
                <div className="my-4">
                    Contatos
                    <ul>
                        <li>(98) 99999-9999</li>
                        <li>(98) 99999-9999</li>
                    </ul>
                </div>
                <div className="my-4">
                    Redes sociais
                    <ul>
                        <li>Instagram: @Instagram</li>
                        <li>Facebook: @Facebook</li>
                    </ul>
                </div>
                <div className="my-4">
                    Formas de pagamento
                    <ul>
                        <li>Cartão de crédito</li>
                        <li>Cartão de débito</li>
                        <li>Boleto</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

