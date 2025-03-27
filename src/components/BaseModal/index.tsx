import type { ReactNode } from 'react';
import { AiOutlineClose, AiTwotoneEdit } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Box, Button, Modal, type ModalProps, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import BaseButton from '../ui/BaseButton';

type FormValues = Record<string, any>;

type BaseFormProps = {
	onSubmit: (fields: any) => Promise<void>
	onClose: () => void;
	open: boolean;
	loading: boolean;
	initialValues?: FormValues;
	updateForm?: boolean;
	children: ReactNode;
} & ModalProps;

export const BaseModal = ({
	onSubmit,
	onClose,
	open,
	loading,
	initialValues,
	updateForm,
	children,
	...rest
}: BaseFormProps) => {
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
						{updateForm ? (
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<AiTwotoneEdit color="#0066cc" size="1.2rem" />
								Editar Produto
							</Box>
						) : (
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<BsFillPlusCircleFill color="#0066cc" size="1.2rem" />
								Novo comentário
							</Box>
						)}
					</Typography>

					<Box sx={{ cursor: 'pointer' }}>
						<AiOutlineClose size="1.5rem" color="#666" onClick={onClose} />
					</Box>
				</Box>

				<Box sx={{ px: 3, py: 2 }}>
					<Formik<FormValues> onSubmit={onSubmit} initialValues={initialValues || {}}>
						{() => (
							<Form>
								{children}
								<Box sx={{
									display: 'flex',
									gap: 2,
									mt: 4,
									justifyContent: 'flex-end',
									borderTop: '1px solid #f0f0f0',
									pt: 3
								}}>
									<BaseButton
										bgColor='bg-red-600'
										hoverColor='bg-gray-500'
										onClick={onClose}
										type="button"
									>
										Cancelar
									</BaseButton>
									<BaseButton
										loading={loading}
										type="submit"

									>
										{updateForm ? 'Salvar alterações' : 'Adicionar produto'}
									</BaseButton>
								</Box>
							</Form>
						)}
					</Formik>
				</Box>
			</Box>
		</Modal>
	);
};