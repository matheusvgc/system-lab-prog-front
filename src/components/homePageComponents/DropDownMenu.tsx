import React, { useState } from "react"

interface Props {
    title: string;
    children: React.ReactNode;
}

export default function DropDownMenu({ title, children }: Props) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };
    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <li 
        className="relative cursor-pointer group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={closeDropdown}
        >
            <p 
            className="hover:text-gray-500"
            onClick={toggleDropdown}
            >{title}</p>
            <ul className={`absolute p-2 top-25% left-0 w-[200px] bg-white rounded-md shadow-md transition-opacity duration-300
                ${isOpen ? "block opacity-100" : "hidden opacity-0"}`}>
                {children}
            </ul>
        </li>
    )
}

