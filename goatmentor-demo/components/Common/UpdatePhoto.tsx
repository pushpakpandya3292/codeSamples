import { faEdit, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Stack, StackProps } from "@mui/material";
import { useRef, useState } from "react";
import Avatar from "./Avatar";

interface Props extends StackProps {
  initialPhoto: string | undefined | null;
  size: number;
  setFieldValue: (field: string, value: File | null) => void;
  name?: string;
  label?: string;
  borderRadius?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const UpdateProfilePhoto = ({
  initialPhoto,
  size,
  setFieldValue,
  name = "photo",
  label = "Photo",
  objectFit,
  borderRadius,
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
    <Stack direction="row" gap={2} alignItems="center" {...props}>
      <Avatar
        src={photo()}
        width={size}
        alt={label}
        borderRadius={borderRadius}
        objectFit={objectFit}
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
      <Stack gap="0.5rem">
        <Button
          variant="outlined"
          onClick={() => fileInput.current?.click()}
          startIcon={<FontAwesomeIcon icon={faEdit} />}>
          Change {label}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setDeleted(true);
            setFile(null);
            setFieldValue(name, null);
          }}
          startIcon={<FontAwesomeIcon icon={faTrash} />}>
          Remove {label}
        </Button>
      </Stack>
    </Stack>
  );
};

export default UpdateProfilePhoto;
