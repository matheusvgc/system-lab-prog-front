
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

interface Props {
    numStars: number;
    editable?: boolean
}

export default function EvaluationStars({ numStars, editable }: Props) {
    const [value, setValue] = useState<number | null>(0);
    console.log('value', value)
    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            {/* <Typography component="legend">Controlled</Typography> */}
            {editable ? <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            /> : <Rating name="read-only" value={numStars} readOnly />}

            {/* <Typography component="legend">Read only</Typography> */}
            {/* <Rating name="read-only" value={numStars} readOnly /> */}
            {/* <Typography component="legend">Disabled</Typography>
            <Rating name="disabled" value={value} disabled />
            <Typography component="legend">No rating given</Typography>
            <Rating name="no-value" value={null} /> */}
        </Box>
    );
}