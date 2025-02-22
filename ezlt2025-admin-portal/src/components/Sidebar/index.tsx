import React, { useState, useEffect, useMemo } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Logo from "@/assets/img/logo.png";
import LogoShort from "@/assets/img/favicon.png";
import Image from "next/image";
import { MENUITEMS } from "./SideBarMenu";
import { usePathname, useRouter } from "next/navigation";
import { Chip, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import { useStats } from "@/provider/stats";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

interface SideBarProps {
  open: boolean;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  borderRight: 0,
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  minHeight: 32,
  color: theme.palette.text.secondary,
  borderRadius: "8px",
  "& svg": {
    "& path": {
      fill: theme.palette.text.secondary,
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
      span: {
        color: "#000000",
      },
    },
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#C3D7FF",
    color: theme.palette.primary.main,
  },
  ":hover": {
    backgroundColor: "#C3D7FF",
    color: theme.palette.primary.main,
    span: {
      color: "#000000",
    },
    "& svg": {
      "& path": {
        fill: theme.palette.primary.main,
      },
    },
  },
}));

const SideBar: React.FunctionComponent<SideBarProps> = ({ open }) => {
  const router = useRouter();
  const pathname = usePathname();
  const stats = useStats();
  const { data: profileDetails } = useSession();
  const [hoverDrawer, sethoverDrawer] = useState(true);
  const menuFilter = useMemo(() => {
    // @ts-ignore
    if (profileDetails?.user?.accountManager?.access_config?.roles) {
      return MENUITEMS.filter((item: any) => {
        // @ts-ignore
        return profileDetails?.user?.accountManager?.access_config?.roles?.includes(
          item.title,
        );
      });
    } else {
      return MENUITEMS;
    }
    // @ts-ignore
  }, [profileDetails?.user?.accountManager?.access_config]);

  const [menuitems, setMenuitems] = useState(menuFilter);
  const handleChangePath = (Item: any, isChild: boolean, child?: any) => {
    if (menuitems) {
      if (!isChild) router.push(`${Item.path}`);
      else router.push(`${child.path}`);
    }
  };
  const handleOpenSub = (Item: any) => {
    setMenuitems(
      menuitems.map((item: any, i: number) => ({
        ...item,
        selected: item.title === Item.title ? !item.selected : false,
      })),
    );
  };

  useEffect(() => {
    setMenuitems(
      menuitems.map((item: any, i: number) => {
        if (!item.children) {
          return {
            ...item,
            active: item.path === pathname,
          };
        } else {
          return {
            ...item,
            active: false,
            selected: item.children.find(
              (children: any) => children.path === pathname,
            ),
            children: item.children.map((children: any, i: number) => {
              return {
                ...children,
                active: children.path === pathname,
              };
            }),
          };
        }
      }),
    );
  }, [pathname]);
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            p: 0,
            background: (theme) => theme.additionalColors?.background.primary,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {open ? (
              <Image
                src={Logo}
                alt=""
                style={{ width: "180px", height: "27px", alignSelf: "center" }}
              />
            ) : (
              <Image
                src={LogoShort}
                alt=""
                style={{ width: "50px", height: "30px" }}
              />
            )}
          </Box>
        </DrawerHeader>
        <Divider />
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: (theme) => theme.palette.primary.main,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                height: { sm: "71vh", lg: "80vh" },
                overflow: "hidden",
                width: "100%",
                position: "sticky",
                overflowY: "auto",
                mt: "4px",
              }}
            >
              <List sx={{ p: 0 }}>
                {menuitems.map((Item: any, index: number) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block", mt: "4px", px: 1 }}
                  >
                    {/* {Item.seprator && (
                      <>
                        <Typography
                          sx={{
                            color: (theme) => theme.additionalColors?.orange,
                            mb: 1,
                            mt: 1,
                            fontWeight: "500",
                            ml: 2,
                            display: open ? "" : "none",
                          }}
                        >
                          {Item?.wrapperTitle}
                        </Typography>
                        <Divider sx={{ borderColor: "#c4c4c4", mb: 1 }} />
                      </>
                    )} */}
                    {Item.type === "link" ? (
                      <ListItemButton
                        selected={Item.active}
                        sx={{
                          justifyContent: open ? "initial" : "center",
                          padding: "6px 8px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          // color: "#ffffff",
                          color: Item.active ? "#c3d7ff" : "#ffffff",
                          background: Item.active ? "#c3d7ff" : "transparnt",
                          borderRadius: "8px",
                        }}
                        onClick={() => handleChangePath(Item, false)}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 2 : "auto",
                            justifyContent: "center",
                            marginRight: "8px",
                            svg: {
                              width: "16px",
                              height: "16px",
                              fill: Item.active ? "#073763" : "#ffffff",
                            },
                          }}
                        >
                          {Item?.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={Item.title}
                          sx={{
                            margin: "0",
                            opacity: open ? 1 : 0,
                            span: {
                              color: (theme) =>
                                Item.active
                                  ? theme.palette.text.primary
                                  : theme.palette.text.secondary,
                            },
                            "& .styledChip": {
                              height: "20px",
                            },
                          }}
                          primaryTypographyProps={{
                            fontSize: "14px",
                            fontWeight: "400",
                          }}
                        />
                        {Item?.isStatus && (
                          <>
                            {/* @ts-ignore  */}
                            {stats?.data?.[Item.StatusKey]?.[Item.StatusKey2] !=
                              0 &&
                              // @ts-ignore
                              stats?.data?.[Item.StatusKey]?.[
                                Item.StatusKey2
                              ] && (
                                <Chip
                                  label={`${
                                    //@ts-ignore
                                    stats?.data?.[Item.StatusKey]?.[
                                      Item.StatusKey2
                                    ]
                                  }
                                New`}
                                  sx={{
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    height: "20px",
                                    span: {
                                      paddingLeft: "6px",
                                      paddingRight: "6px",
                                    },
                                  }}
                                  size="medium"
                                  color="secondary"
                                />
                                // <Typography
                                //   sx={{
                                //     background: "#488ad9",
                                //     px: 2,
                                //     borderRadius: "6px",
                                //   }}
                                // >
                                //   {
                                //     //@ts-ignore
                                //     stats?.data?.[Item.StatusKey]?.[
                                //       Item.StatusKey2
                                //     ]
                                //   }{" "}
                                //   New
                                // </Typography>
                              )}
                          </>
                        )}
                      </ListItemButton>
                    ) : (
                      <>
                        <ListItemButton
                          selected={Item.selected}
                          sx={{
                            justifyContent: open ? "initial" : "center",
                            padding: "2px 8px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            borderRadius: "8px",
                            color: Item.selected ? "#c3d7ff" : "#ffffff",
                            background: Item.selected
                              ? "#c3d7ff"
                              : "transparnt",
                            svg: {
                              fill: Item.selected ? "#073763" : "#ffffff",
                            },
                          }}
                          onClick={() => handleOpenSub(Item)}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 2 : "auto",
                              justifyContent: "center",
                              marginRight: "8px",
                              svg: {
                                width: "16px",
                                height: "16px",
                                fill: Item.selected ? "#073763" : "#ffffff",
                              },
                            }}
                          >
                            {Item?.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={Item.title}
                            sx={{
                              opacity: open ? 1 : 0,
                              span: {
                                color: (theme) =>
                                  Item.selected
                                    ? theme.palette.text.primary
                                    : theme.palette.text.secondary,
                              },
                            }}
                            primaryTypographyProps={{
                              fontSize: "14px",
                              fontWeight: "400",
                            }}
                          />
                          {Item.selected ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse
                          in={Item.selected}
                          timeout="auto"
                          unmountOnExit
                          sx={{ display: open ? "" : "none" }}
                        >
                          <List
                            component="div"
                            sx={{
                              borderRadius: "8px",
                              px: "10px",
                            }}
                          >
                            {Item.children.map((child: any, i: number) => (
                              <ListItemButton
                                selected={child.active}
                                key={i}
                                sx={{
                                  pl: "8px",
                                  py: 0.5,
                                  my: "2px",
                                  padding: "2px 8px",
                                }}
                                onClick={() =>
                                  handleChangePath(Item, true, child)
                                }
                              >
                                <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : "auto",
                                    justifyContent: "center",
                                    marginRight: "8px",
                                    svg: {
                                      width: "16px",
                                      height: "16px",
                                      fill: Item.selected
                                        ? "#073763"
                                        : "#ffffff",
                                    },
                                  }}
                                >
                                  <ArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary={child.title}
                                  sx={{
                                    opacity: open ? 1 : 0,
                                    span: {
                                      color: (theme) =>
                                        child.active
                                          ? theme.palette.text.primary
                                          : theme.palette.text.secondary,
                                    },
                                  }}
                                  primaryTypographyProps={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                />
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      </>
                    )}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "4px",
              py: 1,
            }}
          >
            <Divider
              sx={{
                height: "2px",
                width: "85%",
                border: "1px solid #488AD9",
                borderRadius: "2px",
                alignSelf: "center",
              }}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <ListItem disablePadding sx={{ display: "block", px: 1 }}>
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    padding: "2px 8px",
                  }}
                  onClick={() => signOut()}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      marginRight: "8px",
                    }}
                  >
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.58398 2.16669C6.72203 2.16669 5.89538 2.5091 5.28589 3.11859C4.67639 3.72808 4.33398 4.55473 4.33398 5.41669V20.5834C4.33398 21.4453 4.67639 22.272 5.28589 22.8814C5.89538 23.4909 6.72203 23.8334 7.58398 23.8334H18.4173C19.2793 23.8334 20.1059 23.4909 20.7154 22.8814C21.3249 22.272 21.6673 21.4453 21.6673 20.5834V19.5C21.6673 18.9017 21.1823 18.4167 20.584 18.4167C19.9857 18.4167 19.5007 18.9017 19.5007 19.5V20.5834C19.5007 20.8707 19.3865 21.1462 19.1833 21.3494C18.9802 21.5525 18.7046 21.6667 18.4173 21.6667H7.58398C7.29667 21.6667 7.02112 21.5525 6.81795 21.3494C6.61479 21.1462 6.50065 20.8707 6.50065 20.5834V5.41669C6.50065 5.12937 6.61479 4.85382 6.81795 4.65065C7.02112 4.44749 7.29667 4.33335 7.58398 4.33335H18.4173C18.7046 4.33335 18.9802 4.44749 19.1833 4.65065C19.3865 4.85382 19.5007 5.12937 19.5007 5.41669V6.50002C19.5007 7.09833 19.9857 7.58335 20.584 7.58335C21.1823 7.58335 21.6673 7.09833 21.6673 6.50002V5.41669C21.6673 4.55473 21.3249 3.72808 20.7154 3.11859C20.1059 2.5091 19.2793 2.16669 18.4173 2.16669H7.58398Z"
                        fill="white"
                      />
                      <path
                        d="M18.1 8.98399C17.6769 8.56092 16.991 8.56092 16.568 8.98399C16.1449 9.40706 16.1449 10.093 16.568 10.5161L17.9686 11.9167H13.0007C12.4023 11.9167 11.9173 12.4017 11.9173 13C11.9173 13.5983 12.4023 14.0834 13.0007 14.0834H17.9686L16.568 15.484C16.1449 15.9071 16.1449 16.593 16.568 17.0161C16.991 17.4391 17.6769 17.4391 18.1 17.0161L21.35 13.7661C21.7731 13.343 21.7731 12.6571 21.35 12.234L18.1 8.98399Z"
                        fill="white"
                      />
                    </svg>
                  </ListItemIcon>
                  <ListItemText
                    primary={"Logout Account"}
                    sx={{
                      opacity: open ? 1 : 0,
                      span: {
                        color: (theme) => theme.palette.text.secondary,
                      },
                    }}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideBar;
