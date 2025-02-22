import {
  IconDefinition,
  faBookReader,
  faBriefcase,
  faGraduationCap,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { NextLinkComposed } from "../Mui/Link";

interface Props {
  title: string;
  description: string;
  icon: IconDefinition;
  color: string;
}

const Benefit = ({ title, description, icon, color }: Props) => {
  return (
    <Stack direction="row" alignItems="flex-start" gap={3}>
      <IconButton
        color="primary"
        aria-label="Benefit icon"
        sx={{
          padding: `1rem`,
          backgroundColor: `${color} !important`,
          cursor: "default",
        }}>
        <FontAwesomeIcon icon={icon} size="lg" />
      </IconButton>
      <Stack>
        <Typography variant="headlinelg" color="var(--text-title)">
          {title}
        </Typography>
        <Typography variant="bodylg">{description}</Typography>
      </Stack>
    </Stack>
  );
};

const Benefits = () => {
  return (
    <Box
      component="section"
      className="wrapper"
      id="apply"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: { xs: "3rem auto 1rem", md: "3rem auto" },
        padding: "0 1rem",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "center",
        gap: 8,
      }}>
      <Stack
        alignItems={{ xs: "center", lg: "flex-start" }}
        sx={{ flexGrow: 1, maxWidth: "500px", gap: 1 }}>
        <div className="primary-divider"></div>
        <Typography
          variant="displaysm"
          textAlign={{ xs: "center", lg: "left" }}
          color="var(--text-primary)">
          OPPORTUNITY
        </Typography>
        <Typography
          variant="displaymd"
          textAlign={{ xs: "center", lg: "left" }}
          color="var(--text-title)">
          Build a career with us
        </Typography>
        <Stack gap={4} sx={{ marginBlock: 3 }}>
          <Benefit
            title="Top tier courses"
            // description="Follow courses from top level professionals in design, development and management. Complete courses and receive a certification."
            description="Elevate your skills before you look for IT career opportunities. Our IT courses online give you the chance to take initial software developer training at home at your own pace, and gives you the opportunity to combine education with other work. "
            icon={faBookReader}
            color="var(--tertiary)"
          />
          <Benefit
            title="Apply as a trainee"
            // description="Get hands on training for your profession. Emulate our senior developers and build your skills while also improving your resume."
            description="Jumpstart your career with our IT internship and trainee programs. Gain hands-on experience, mentorship on real-world IT projects and tech companies. It is also for last-year computer science students looking for attachment opportunities"
            icon={faGraduationCap}
            color="var(--primary-variant)"
          />
          <Benefit
            title="Apply as a developer"
            // description="Open the opportunity to come work together with our developers in our projects. Apply for jobs in Goatmentor to kickstart your career."
            description="Participate in software developer training in a real-world project. This is to gain knowledge as an IT trainee with an experienced software engineer mentor. Our specialized software developer training program is a gateway to becoming a tech maven"
            icon={faBriefcase}
            color="var(--primary)"
          />
        </Stack>

        <Button
          variant="contained"
          size="large"
          component={NextLinkComposed}
          to="/careers"
          sx={{ width: { xs: "100%", lg: "50%" }, marginTop: 2 }}>
          Apply Now
        </Button>
      </Stack>
      <Box
        sx={{
          width: { xs: "auto", lg: "100%" },
          maxWidth: { xs: "100%", lg: "50%" },
        }}>
        <Image
          src="/images/benefits.webp"
          alt="Benefits image"
          width={624}
          height={557}
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

export default Benefits;
