
interface Props {
    label: string;
    name: string;
    placeholder: string;
    type: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthTextInput({ label, name, placeholder, type, handleInputChange }: Props) {
    return (
        <div className="flex flex-col">
            <label>{label}</label>
            <input 
                className="bg-gray-200 p-2 border-2 rounded-lg shadow-xl" 
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={handleInputChange}
                required
            />
        </div>
    )
}

