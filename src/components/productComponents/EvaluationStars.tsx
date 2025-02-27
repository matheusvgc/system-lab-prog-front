
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


export default function EvaluationStars() {
    // const [value, setValue] = React.useState(4);

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            {/* <Typography component="legend">Controlled</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            /> */}
            {/* <Typography component="legend">Read only</Typography> */}
            <Rating name="read-only" value={4} readOnly />
            {/* <Typography component="legend">Disabled</Typography>
            <Rating name="disabled" value={value} disabled />
            <Typography component="legend">No rating given</Typography>
            <Rating name="no-value" value={null} /> */}
        </Box>
    );
}