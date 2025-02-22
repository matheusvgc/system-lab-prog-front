
interface Props {
    label: string;
    placeholder: string;
    type: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthTextInput({ label, placeholder, type, handleInputChange }: Props) {
    return (
        <div className="flex flex-col">
            <label>{label}</label>
            <input 
                className="bg-gray-200 p-2 border-2 rounded-lg shadow-xl" 
                type={type}
                placeholder={placeholder}
                onChange={handleInputChange}
                required
            />
        </div>
    )
}

