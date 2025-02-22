"use client";
import { faPlay } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";

interface Props {
  scale?: number;
  onClick?: () => void;
  ariaLabel?: string;
  cursor?: string;
}

const PlayButton = ({
  scale = 1,
  onClick,
  ariaLabel = "Play Button",
  cursor,
}: Props) => {
  return (
    <IconButton
      color="primary"
      size="large"
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        padding: `${scale}rem`,
        paddingLeft: `${scale * 1.25}rem`,
        aspectRatio: 1,
        cursor: cursor ?? !!onClick ? "pointer" : "default",
      }}>
      <FontAwesomeIcon
        icon={faPlay}
        color="var(--on-primary)"
        // @ts-ignore
        size={`${scale}x`}
      />
    </IconButton>
  );
};

export default PlayButton;
