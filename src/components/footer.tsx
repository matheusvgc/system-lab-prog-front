import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
export default function Footer() {
    return (
        <footer className="bg-[#121212] text-white p-8 text-center text-xl">
            <div className="my-4">
                TECH SHOP &copy; 2022
            </div>
            <div className="md:flex md:gap-8 md:justify-center">
                <div className="my-4">
                    Contatos
                    <ul>
                        <li> <PhoneIcon /> (98) 99999-9999</li>
                        <li><PhoneIcon /> (98) 99999-9999</li>
                    </ul>
                </div>
                <div className="my-4">
                    Redes sociais
                    <ul>
                        <li><InstagramIcon /> @Instagram</li>
                        <li><FacebookIcon /> @Facebook</li>
                    </ul>
                </div>
                <div className="my-4">
                    Formas de pagamento
                    <ul>
                        <li><CreditCardIcon /> Cartão de crédito</li>
                        <li><CreditCardIcon /> Cartão de débito</li>
                        <li><ReceiptIcon /> Boleto</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

