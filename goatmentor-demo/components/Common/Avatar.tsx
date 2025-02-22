import Image from "next/image";

interface Props {
  src: string | null;
  alt: string;
  width: number;
  borderRadius?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const Avatar = ({
  alt = "Avatar",
  src,
  borderRadius = "var(--radius-full)",
  objectFit = "cover",
  ...props
}: Props) => {
  return (
    <Image
      src={src || "/images/avatar.svg"}
      {...props}
      alt={alt}
      height={props.width}
      style={{
        borderRadius: borderRadius,
        objectFit: objectFit,
      }}
    />
  );
};

export default Avatar;
