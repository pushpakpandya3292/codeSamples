"use client";

import { faThumbsUp } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Stack, Typography } from "@mui/material";

const ResetPasswordSuccess = () => {
    return (
        <>
            <IconButton
                color="secondary"
                sx={{
                    alignSelf: "flex-start",
                    padding: `1rem`,
                    aspectRatio: 1,
                    m: '0 auto'
                }}>
                <FontAwesomeIcon icon={faThumbsUp} size="2x" />
            </IconButton>
            <Stack gap={2}>
                <Typography variant="headlinelg">Password Reset Successful</Typography>
                <Typography>
                    Your password has been successfully reset. You can now log in using your updated credentials.
                </Typography>
                <Typography>
                    <b>Important:</b> Please return to the previous tab or window to access the login page.
                </Typography>
                <Typography>
                    Thank you for choosing our platform.
                </Typography>
            </Stack>
        </>
    );
};

export default ResetPasswordSuccess;
