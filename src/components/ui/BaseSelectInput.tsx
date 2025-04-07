import { CircularProgress } from "@mui/material";
import clsx from "clsx";


interface ButtonProps {
    children?: React.ReactNode;
    onChange?: any;
    bgColor?: string;
    textColor?: string;
    hoverColor?: string;
    loading?: boolean
}

export default function BaseSelectInput({
    children,
    onChange,
    loading,
    bgColor = "bg-gray-600",
    textColor = "text-white",
    hoverColor = "hover:bg-gray-700",
}: ButtonProps) {
    return (
        <>
            {loading ? (
                <CircularProgress size={20} color="inherit" />
            ) : (
                <select 
                    onChange={onChange}
                    className={clsx(
                        bgColor,
                        hoverColor,
                        textColor,
                        "font-bold py-2 px-4 rounded cursor-pointer text-sm transition duration-300"
                    )}>
                    {children}
                </select>
            )}
        </>
    )
}
