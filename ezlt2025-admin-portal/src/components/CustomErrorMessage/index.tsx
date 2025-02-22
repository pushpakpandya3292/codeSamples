import { Typography } from '@mui/material'
import React from 'react'

interface CustomErrorMessageProps {
    error: any
}

function CustomErrorMessage({ error }: CustomErrorMessageProps) {
    return (
        <Typography
            sx={{ fontSize: '10px', marginTop: '5px', color: (theme) => theme.palette.error.main }}
        >
            {error}
        </Typography>
    )
}

export default CustomErrorMessage