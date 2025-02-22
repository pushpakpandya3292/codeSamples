"use client";
import Avatar from "@/components/Common/Avatar";
import { NextLinkComposed } from "@/components/Mui/Link";
import { faSearch } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Pagination,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  users: User[];
  userCount: number;
  page: number;
  search: string;
}

const UserList = ({ users, userCount, page, search }: Props) => {
  const laptop = useMediaQuery("(min-width:1024px)");
  const tablet = useMediaQuery("(min-width:640px)");
  const router = useRouter();
  return (
    <>
      <TextField
        placeholder="Search"
        type="search"
        autoFocus
        defaultValue={search}
        InputProps={{
          startAdornment: (
            <FontAwesomeIcon
              icon={faSearch}
              color="var(--text-subtitle)"
              size="lg"
              style={{ marginLeft: "14px" }}
            />
          ),
        }}
        onChange={(e) =>
          router.push(`/admin/users?page=1&search=${e.target.value}`)
        }
        sx={{ marginInline: "1rem" }}
      />
      <Stack gap={1}>
        {users.map((user) => (
          <Stack
            key={user.uid}
            direction="row"
            gap={{ xs: 2, md: 4 }}
            alignItems="center"
            sx={{
              padding: "1rem 0",
              borderBottom: "1px solid var(--border)",
            }}>
            <Avatar src={user.photo} width={56} alt="Profile Photo" />
            <Stack sx={{ flexGrow: 1, overflow: "hidden" }}>
              <Typography variant="titlelg" className="text-ellipsis">
                {user.fullName}
              </Typography>
              <Typography
                variant="labelmd"
                className="text-ellipsis"
                color="var(--text-subtitle)">
                {user.email}
              </Typography>
            </Stack>
            <Button
              size="small"
              variant="outlined"
              component={NextLinkComposed}
              to={`/admin/users/${user.uid}`}>
              Update
            </Button>
          </Stack>
        ))}
      </Stack>
      {userCount > 20 && (
        <Pagination
          count={Math.ceil(userCount / 20)}
          page={page}
          color="primary"
          size={laptop ? "large" : tablet ? "medium" : "small"}
          onChange={(e, page) => {
            router.push(`/admin/users?page=${page}&search=${search}`);
          }}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPagination-ul": {
              justifyContent: "center",
            },
          }}
        />
      )}
    </>
  );
};

export default UserList;
