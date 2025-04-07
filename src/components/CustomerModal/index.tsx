
import { AiOutlineClose, } from 'react-icons/ai';

import { Box, Modal, Typography } from '@mui/material';
import type { UserProps } from '@/hooks/useAuth';




type CustomerModalProps = {
	onClose: () => void;
	open: boolean;
	loading?: boolean;
	user: UserProps
}

export const CustomerModal = ({
	onClose,
	open,
	loading,
	user,
	...rest
}: CustomerModalProps) => {
	console.log('user', user)
	return (
		<Modal open={open} onClose={onClose} {...rest}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: { xs: '90%', sm: '80%', md: '600px' },
					bgcolor: 'background.paper',
					boxShadow: 24,
					borderRadius: '8px',
					outline: 'none',
					maxHeight: '90vh',
					overflow: 'auto',
					border: '1px solid #e0e0e0'
				}}
			>
				<Box
					sx={{
						px: 3,
						py: 2,
						borderBottom: '1px solid #f0f0f0',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						backgroundColor: '#f8f8f8'
					}}
				>
					<Typography variant="h6" fontWeight="bold" color="#333">

						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

							Informações do cliente
						</Box>

					</Typography>

					<Box sx={{ cursor: 'pointer' }}>
						<AiOutlineClose size="1.5rem" color="#666" onClick={onClose} />
					</Box>
				</Box>

				<Box sx={{ px: 3, py: 2 }}>
					{user ? (
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
							<Typography variant="body1" color="#333">
								Nome: {user?.firstname} {user?.lastname}
							</Typography>
							<Typography variant="body1" color="#333">
								Email: {user?.email}
							</Typography>
							<Typography variant="body1" color="#333">
								CPF: {user?.cpf}
							</Typography>
							{user?.addresses?.map((address, index) => (
								<Box key={index}>
									<Typography variant="body1" color="#333">
										Endereço: {address.street}, {address.number}, {address.neighborhood}, {address.city}, {address.state}
									</Typography>
								</Box>
							))}

						</Box>
					) : null}

				</Box>
			</Box>
		</Modal>
	);
};