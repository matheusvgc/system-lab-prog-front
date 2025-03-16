
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

interface Props {
    numStars: number;
}

export default function EvaluationStars({ numStars }: Props) {
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
            <Rating name="read-only" value={numStars} readOnly />
            {/* <Typography component="legend">Disabled</Typography>
            <Rating name="disabled" value={value} disabled />
            <Typography component="legend">No rating given</Typography>
            <Rating name="no-value" value={null} /> */}
        </Box>
    );
}