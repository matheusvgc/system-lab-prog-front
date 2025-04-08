
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

interface Props {
    numStars?: number;
    editable?: boolean;
    onChange?: (value: number | null) => void;
}

export default function EvaluationStars({ numStars, editable, onChange }: Props) {
    const [value, setValue] = useState<number | null>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number | null) => {
        console.log('event', event)
        setValue(newValue);
        if (onChange) onChange(newValue);
    };

    return (
        <Box sx={{ '& > legend': { mt: 2 } }}>
            {editable ? (
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={handleChange}
                />
            ) : (
                <Rating name="read-only" value={numStars} readOnly />
            )}
        </Box>
    );
}
