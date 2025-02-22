import { Box, IconButton, Modal, Stack, Typography } from '@mui/material';
import React from 'react'
import { MODAL_BOX } from '../Mui/overrides/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCloudArrowUp, faTrash } from '@fortawesome/pro-regular-svg-icons';
import Dropzone from 'react-dropzone';
import LoadingButton from '../Common/LoadingButton';

interface Props {
    open: boolean;
    data: File | null;
    loading: boolean;
    onClose: () => void;
    handleChange: (value: File | null) => void;
    onSubmit: () => void;
}

const ContractModel = ({ open, onClose, handleChange, onSubmit, data, loading }: Props) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            disableEscapeKeyDown
            aria-labelledby="settings-title">
            <Box sx={MODAL_BOX}>
                <Stack
                    direction="row"
                    gap={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ color: "var(--text-title)", position: "relative" }}>
                    <Typography id="settings-title" variant="headlinelg">
                        Applicant Contract
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: "0",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--text-title)",
                        }}>
                        <FontAwesomeIcon icon={faClose} />
                    </IconButton>
                </Stack>
                <Stack gap={1}>
                    <Dropzone
                        onDrop={(acceptedFiles) => {
                            if (acceptedFiles.length) {
                                const file = acceptedFiles[0];
                                handleChange(file)
                            }
                        }}
                        accept={{
                            "application/pdf": [],
                            // "application/msword": [".doc", ".docx"],
                        }}
                    >
                        {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => (
                            <Box
                                sx={{
                                    width: "100%",
                                    border: "1px dashed var(--border-secondary)",
                                    borderRadius: "var(--radius-md)",
                                    backgroundColor: "var(--surface-secondary)",
                                    padding: 2,
                                    textAlign: "center",
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    transition: "all 500ms ease-in-out",
                                    ":hover": {
                                        borderColor: "var(--border-primary)",
                                    },
                                    ...(isDragAccept && {
                                        backgroundColor: "var(--primary-container)",
                                        borderColor: "var(--primary)",
                                        transform: "scale(1.0125)",
                                    }),
                                    ...(isDragReject && {
                                        backgroundColor: "var(--error-light)",
                                        borderColor: "var(--error)",
                                    }),
                                }}
                                {...getRootProps()}>
                                <input {...getInputProps()} />
                                <FontAwesomeIcon
                                    icon={faCloudArrowUp}
                                    size="3x"
                                    style={{ transition: "all 500ms ease-in-out" }}
                                    color={
                                        isDragReject
                                            ? "var(--error)"
                                            : !!data
                                                ? "var(--success)"
                                                : "var(--text-primary)"
                                    }
                                />
                                <Typography variant="titlemd">Upload Document</Typography>
                                <Typography variant="labelmd">
                                    Drag & drop files or{" "}
                                    <span className="text-primary">Browse</span>
                                </Typography>
                                <Typography variant="labelsm" color="var(--text-subtitle)">
                                    Supported formats: PDF
                                </Typography>
                            </Box>
                        )}
                    </Dropzone>
                    {data &&
                        <Stack
                            direction={"row"}
                            sx={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                flex: 1
                            }}
                        >
                            <Typography variant="labelmd">
                                {data?.name}
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={() => handleChange(null)}
                                sx={{
                                    color: "var(--error)",
                                }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>
                        </Stack>
                    }
                    <LoadingButton
                        disabled={!data}
                        loading={loading}
                        variant="contained"
                        type="button"
                        size="large"
                        onClick={onSubmit}
                    >
                        Submit
                    </LoadingButton>
                </Stack>
            </Box>
        </Modal>
    )
}

export default ContractModel