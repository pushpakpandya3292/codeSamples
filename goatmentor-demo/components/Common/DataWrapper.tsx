import { Stack, StackProps, Typography } from "@mui/material";
import Image from "next/image";

interface Props extends StackProps {
  data: boolean;
  title: string;
  children: React.ReactNode;
  description?: string;
}

const DataWrapper = ({
  data,
  title,
  children,
  description,
  ...props
}: Props) => {
  return data ? (
    children
  ) : (
    <Stack
      direction="row"
      alignItems="center"
      alignSelf="flex-start"
      gap={2}
      {...props}
      sx={{
        backgroundColor: "var(--surface-secondary)",
        borderRadius: "var(--radius-lg)",
        padding: { xs: 2, md: 4 },
        minWidth: "232px",
        ...props.sx,
      }}>
      <Image src="/images/no-data.svg" alt="No Data" width={100} height={100} />
      <Stack
        alignItems={props.direction === "column" ? "center" : "flex-start"}
        sx={{
          textAlign: props.direction === "column" ? "center" : "left",
        }}>
        <Typography variant="headlinesm">{title}</Typography>
        <Typography variant="labellg" color="var(--text-subtitle)">
          {description ?? "There is no data to show here."}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DataWrapper;
