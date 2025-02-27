
interface Props {
    changePage: () => void;
    icon: string;
}

export default function ChangePageButton({changePage, icon}: Props) {
    return (
        <button 
            className="px-2 py-1 bg-gray-200 rounded-lg cursor-pointer"
            onClick={changePage}
        >{icon}</button>
    )
}
