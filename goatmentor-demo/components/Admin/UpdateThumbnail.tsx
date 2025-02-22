import { faEdit, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Stack, StackProps, Typography } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";

interface Props extends StackProps {
  initialPhoto: string | undefined | null;
  setFieldValue: (field: string, value: File | null) => void;
  name: string;
  title?: string;
}

const UpdateThumbnail = ({
  initialPhoto,
  setFieldValue,
  name,
  title = "Featured Image",
  ...props
}: Props) => {
  const [file, setFile] = useState<string | null>(null);
  const [deleted, setDeleted] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const photo = () => {
    if (deleted) return null;
    return file ?? initialPhoto ?? null;
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap={4}
      alignItems="center"
      {...props}>
      <Image
        width={640}
        height={360}
        src={photo() || "/images/thumbnail.svg"}
        alt="Thumbnail"
        style={{
          objectFit: "cover",
          borderRadius: "var(--radius-md)",
          maxWidth: "100%",
          aspectRatio: "16/9",
          height: "auto",
        }}
      />
      <input
        type="file"
        hidden
        accept="image/png, image/jpeg, image/jpg, image/webp"
        ref={fileInput}
        onChange={(e) => {
          if (e.target.files) {
            setDeleted(false);
            const file = e.target.files[0];
            setFile(URL.createObjectURL(file));
            setFieldValue(name, file);
          }
        }}
      />
      <Stack
        gap="1rem"
        sx={{
          flex: 1,
          minWidth: "min(70vw, 240px)",
          maxWidth: "450px",
        }}>
        <Typography variant="headlinemd">{title}</Typography>
        <Typography variant="labelmd" color="var(--text-subtitle)">
          Recommended Size: 1440x810 (16:9) | JPG, PNG, WEBP Only
        </Typography>
        <Button
          variant="outlined"
          size="large"
          onClick={() => fileInput.current?.click()}
          startIcon={<FontAwesomeIcon icon={faEdit} />}>
          Change Photo
        </Button>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => {
            setDeleted(true);
            setFile(null);
            setFieldValue(name, null);
          }}
          startIcon={<FontAwesomeIcon icon={faTrash} />}>
          Remove Photo
        </Button>
      </Stack>
    </Stack>
  );
};

export default UpdateThumbnail;
