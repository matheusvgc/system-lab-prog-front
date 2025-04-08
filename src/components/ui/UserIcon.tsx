interface UserIconProps {
    name: string; // Nome do usuário
    imageUrl?: string; // URL da imagem de perfil (opcional)
    loading: boolean
    isMobile?: boolean; // Propriedade para indicar se é para mobile
}

const UserIcon: React.FC<UserIconProps> = ({ name, imageUrl, isMobile }) => {
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
            {!isMobile && <span className="text-white-700 font-medium">{name}</span>}

        </div>
    );
};

export default UserIcon;