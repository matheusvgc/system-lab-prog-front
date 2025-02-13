import Categorie, { CategorieInterface } from "./categorie"

export default function CategoriesMenu () {

    const categories: CategorieInterface[] = [
        {
            url: "/",
            label: "Headsets"
        },
        {
            url: "/",
            label: "Teclados"
        },{
            url: "/",
            label: "Mouses"
        },{
            url: "/",
            label: "Processadores"
        },{
            url: "/",
            label: "Placas de vídeo"
        },
    ]

    return (
        <div>
            <ul className="bg-white hidden md:flex items-center justify-center gap-6 h-14">
                {categories.map((categorie, index) => (
                    <Categorie
                        key={index}
                        url={categorie.url}
                        label={categorie.label}
                    />
                ))}
            </ul>
        </div>
    )
}