
interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

export default function BaseButton({ children, onClick }: ButtonProps) {
    return (
        <button type="button" onClick={onClick} className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-2 px-4 rounded cursor-pointer text-sm">
            {children}
        </button>
    )
}

