import React from "react"

interface Props {
    title: string;
    children: React.ReactNode;
}

export default function DropDownMenu({ title, children }: Props) {
    return (
        <li className="relative cursor-pointer group">
            <p className="hover:text-gray-500">{title}</p>
            <ul className="absolute p-2 top-25% left-0 w-[200px] bg-white rounded-md shadow-md hidden group-hover:block transition-opacity">
                {children}
            </ul>
        </li>
    )
}

