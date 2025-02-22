import Benefits from "@/components/Landing/Benefits";
import Footer from "@/components/Landing/Footer";
import LandingHeader from "@/components/Landing/Header";
import Hero from "@/components/Landing/Hero";
import Newsletter from "@/components/Landing/Newsletter";
import LandingProjects from "@/components/Landing/Projects";
import WelcomeVideo from "@/components/Landing/Welcome";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Stack } from "@mui/material";

const LandingCourses = dynamic(() => import("@/components/Landing/Courses"));

export default function HomePage() {
  return (
    <Stack component="main" alignItems="center">
      <LandingHeader />
      <Hero />
      <WelcomeVideo />
      <Benefits />
      <LandingProjects />
      <Suspense fallback={<div></div>}>
        <LandingCourses />
      </Suspense>
      <Newsletter />
      <Footer />
    </Stack>
  );
}
