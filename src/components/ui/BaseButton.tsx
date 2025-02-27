import clsx from "clsx";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    bgColor?: string;
    textColor?: string;
    hoverColor?: string;
}

export default function BaseButton({
    children,
    onClick,
    bgColor = "bg-gray-600",
    textColor = "text-white",
    hoverColor = "hover:bg-gray-700",
}: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                bgColor,
                hoverColor,
                textColor,
                "font-bold py-2 px-4 rounded cursor-pointer text-sm transition duration-300"
            )}
        >
            {children}
        </button>
    );
}
