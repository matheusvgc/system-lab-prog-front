
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import BaseButton from './BaseButton';
import { useNavigate } from 'react-router-dom';
interface CardAdminOptionsProps {
    title: string
    description: string;
    image?: string;
    textButton: string;
    bgColor?: string
    redirect: string
}



export default function CardAdminOptions({ title, description, image, textButton, bgColor, redirect }: CardAdminOptionsProps) {

    const navigate = useNavigate();

    const handleRedirect = (redirect: string) => {
        navigate(redirect)
    }
    return (
        <Card sx={{ width: 345, bgcolor: bgColor || '#C0C0C0' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color='white'>
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF', height: 50, overflow: 'hidden', }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className='justify-center'>
                <BaseButton onClick={() => handleRedirect(redirect)}>{textButton}</BaseButton>
                {/* <Button size="small" color="primary">
                    {textButton}
                </Button> */}
            </CardActions>
        </Card>
    );
}