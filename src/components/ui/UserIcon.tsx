
import { CircularProgress } from "@mui/material";
import { Context } from "@/context/authContext";
import { useContext } from "react";
interface UserIconProps {
    name: string; // Nome do usuário
    imageUrl?: string; // URL da imagem de perfil (opcional)
    loading: boolean
}

const UserIcon: React.FC<UserIconProps> = ({ name, imageUrl, loading }) => {

    if (loading) {
        return (
            <CircularProgress
                size={20}
            />
        )
    }

    return (
        <div className="flex items-center space-x-2">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                />
            ) : (
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-black-700 text-lg font-semibold">
                        {name[0].toUpperCase()}
                    </span>
                </div>
            )}

            <span className="text-white-700 font-medium">{name}</span>
        </div>
    );
};

export default UserIcon;