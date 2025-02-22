"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";
import { Box } from "@mui/material";
import SideBar from "@/components/Sidebar";
import Divider from "@mui/material/Divider";
import Header from "@/components/Header/index";
import { setAuthenticationHeader } from "@/services";
import { generateToken, messaging } from "@/utils/firebase/firebase";
import { onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { status, data } = useSession();
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
      //@ts-ignore
      setAuthenticationHeader(data?.user?.token);
    } else if (status === "unauthenticated") {
      setLoading(false);
      redirect("/login");
    }
  }, [status]);

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      toast(payload.notification?.body);
    });
  }, []);

  if (loading) return <Loader />;
  else
    return (
      <Box sx={{ display: "flex" }}>
        <Box>
          <SideBar open={drawerOpen} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: drawerOpen ? `calc(100vw - 240px)` : `calc(100vw - 65px)`,
            height: "100vh",
            position: "relative",
          }}
        >
          <Header handleDrawer={handleDrawerOpen} />
          <Divider />
          <Box
            sx={{
              background: (theme) =>
                theme.additionalColors?.background.secondary,
              width: drawerOpen ? `calc(100vw - 240px)` : `calc(100vw - 65px)`,
              height: "calc(100vh - 66px)",
              overflowY: "auto",
              px: 3,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    );
}

export default DashboardLayout;
