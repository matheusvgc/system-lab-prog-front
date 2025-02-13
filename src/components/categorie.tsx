export interface CategorieInterface {
    url: string;
    label: string;
}

export default function Categorie (props: CategorieInterface) {
    return (
        <li>
            <a
                className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-[width] after:duration-200 after:ease-in-out hover:after:w-full"
                href={props.url}>
                {props.label}
            </a>
        </li>
    )
} 