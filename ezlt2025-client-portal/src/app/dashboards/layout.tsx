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
import dynamic from "next/dynamic";
import { useUserDetailListing } from "@/provider/profile";
const DashoboardTutorial = dynamic(
  () => import("@/components/DashboardTutorial"),
  { ssr: true },
);
import useBreakPoints from "@/hooks/useBreakPoints";
import StickyMenuMobile from "@/components/StickyMenu";
import MobileSidebar from "@/components/MobileSidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { status, data } = useSession();
  const [loading, setLoading] = useState(true);
  const [stickyNav, setStickyNav] = useState(false);
  const { data: profileData } = useUserDetailListing({
    isValid: !loading,
  });
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const { matchDownSM, matchDownMD } = useBreakPoints();
  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  const toggleMobileDrawer = (newOpen: boolean) => () => {
    setMobileDrawerOpen(newOpen);
  };
  useEffect(() => {
    if (matchDownSM) {
      setDrawerOpen(true);
      setStickyNav(true);
    } else if (matchDownMD) {
      setDrawerOpen(false);
      setStickyNav(false);
    } else {
      setDrawerOpen(true);
      setStickyNav(false);
    }
  }, [matchDownSM, matchDownMD]);
  useEffect(() => {
    if (status === "authenticated") {
      //@ts-ignore
      setAuthenticationHeader(data?.user?.token);
      setLoading(false);
    } else if (status === "unauthenticated") {
      setLoading(false);
      redirect("/login");
    }
  }, [status]);

  if (loading) return <Loader />;
  else
    return (
      <Box className="welcomeMessage" sx={{ display: "flex" }}>
        {profileData && profileData?.isShowToolTip && (
          <DashoboardTutorial showTour={true} />
        )}
        <Box>
          <SideBar open={drawerOpen} />
        </Box>
        <Box>
          <MobileSidebar
            mobileDrawerOpen={mobileDrawerOpen}
            toggleMobileDrawer={toggleMobileDrawer}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: drawerOpen ? `calc(100vw - 280px)` : `calc(100vw - 65px)`,
            height: "100vh",
          }}
        >
          <Header
            handleDrawer={handleDrawerOpen}
            toggleMobileDrawer={toggleMobileDrawer}
          />
          <Divider />
          <Box
            sx={{
              background: (theme) =>
                theme.additionalColors?.background.secondary,
              // width: drawerOpen ? `calc(100vw - 280px)` : `calc(100vw - 65px)`,
              height: { xs: "calc(100vh - 122px)", sm: "calc(100vh - 66px)" },
              overflowY: "auto",
            }}
          >
            {children}
          </Box>
          {stickyNav && (
            <Box>
              <StickyMenuMobile />
            </Box>
          )}
        </Box>
      </Box>
    );
}

export default DashboardLayout;
