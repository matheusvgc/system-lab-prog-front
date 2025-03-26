import { CircularProgress } from "@mui/material";
import clsx from "clsx";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    bgColor?: string;
    textColor?: string;
    hoverColor?: string;
    loading?: boolean,
    type?: typeButtonProps
}
type typeButtonProps = "button" | "submit" | "reset"

export default function BaseButton({
    children,
    onClick,
    loading,
    bgColor = "bg-gray-600",
    textColor = "text-white",
    hoverColor = "hover:bg-gray-700",
    type
}: ButtonProps) {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={clsx(
                bgColor,
                hoverColor,
                textColor,
                "font-bold py-2 px-4 rounded cursor-pointer text-sm transition duration-300"
            )}
            disabled={loading}
        >
            {loading ? <CircularProgress size={20} color="inherit" /> : children}
        </button>
    );
}
