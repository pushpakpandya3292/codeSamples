import React, { ReactNode, useState } from "react";
import {
  Box,
  Divider,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiListItemButton from "@mui/material/ListItemButton";
import { EmailFolders } from "@/constant";
import ListItem from "@mui/material/ListItem";

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  minHeight: 40,
  color: theme.palette.primary.main,
  borderRadius: "8px",
  "& svg": {
    "& path": {
      fill: theme.palette.primary.main,
    },
  },
  "&.Mui-selected": {
    backgroundColor: "#C3D7FF",
    color: "red",
    "& svg": {
      "& path": {
        fill: theme.palette.primary.main,
      },
    },
    ":hover": {
      backgroundColor: "#C3D7FF",
      color: theme.palette.primary.main,
    },
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#C3D7FF",
    color: theme.palette.primary.main,
  },
  ":hover": {
    backgroundColor: "#C3D7FF",
    color: theme.palette.primary.main,
    "& svg": {
      "& path": {
        fill: theme.palette.primary.main,
      },
    },
  },
}));

interface EmailFoldersMenuProps {
  menuItems: { folder: EmailFolders; active: boolean }[];
  handleSelectItem: (Item: EmailFolders, __startIndex: number) => void;
  FolderIcon: (folder: EmailFolders, color: string) => ReactNode;
}

function EmailFoldersMenu({
  menuItems,
  handleSelectItem,
  FolderIcon,
}: EmailFoldersMenuProps) {
  return (
    <Box>
      <List sx={{ p: 0 }}>
        {menuItems.map((Item, i) => (
          <React.Fragment key={i}>
            <ListItem
              key={Item.folder}
              disablePadding
              sx={{ display: "block", px: 0.5 }}
            >
              <ListItemButton
                selected={Item.active}
                sx={{
                  justifyContent: "center",
                  gap: 1,
                }}
                onClick={() => handleSelectItem(Item.folder, 0)}
              >
                <ListItemIcon
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  {FolderIcon(Item.folder, "#566a91")}
                </ListItemIcon>
                <ListItemText
                  primary={Item.folder}
                  sx={{
                    span: {
                      color: (theme) => theme.palette.primary.main,
                    },
                  }}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                />
              </ListItemButton>
            </ListItem>
            {menuItems.length - 1 != i && <Divider variant="middle" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default EmailFoldersMenu;
