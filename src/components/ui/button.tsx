import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "destructive" | "aprove";
    size?: "sm" | "md" | "lg";
}

export default function Button({ 
    variant = "default", 
    size = "md", 
    className, 
    ...props 
}: ButtonProps) {
    
    const variants = {
        default: "bg-blue-700 hover:bg-blue-800 text-white",
        outline: "border border-gray-300 hover:bg-gray-100",
        destructive: "bg-red-700 hover:bg-red-800 text-white",
        aprove: "bg-green-700 hover:bg-green-800 text-white",
    };

    const sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={cn(
                "rounded-md font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
}
