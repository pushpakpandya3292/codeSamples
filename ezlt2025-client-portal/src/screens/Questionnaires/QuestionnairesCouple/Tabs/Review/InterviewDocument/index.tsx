"use client";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Skeleton,
  styled,
  Tab,
  Tabs,
  Typography,
  Zoom,
} from "@mui/material";
import { legal_cities } from "@/constants/LegalCities";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCreateDocument } from "@/provider/DocumentBuilder";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import CustomModal from "@/components/CustomModal";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });
const StaticPdfViewer = dynamic(() => import("./StaticPdfViewer"), {
  ssr: false,
});
interface PdfWrapperProps {
  handleStepChange: () => void;
  data: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{ width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const StyledTab = styled((props: any) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "capitalize",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "left",
    fontWeight: 600,
    padding: "0 0",
    color: "#073763",
    "&.Mui-selected svg": {
      color: theme.additionalColors?.tablightBlue,
    },
    "&.Mui-selected": {
      color: theme.additionalColors?.tablightBlue,
    },
    [theme.breakpoints.up("xs")]: {
      alignItems: "flex-start",
      justifyContent: "flex-start",
      // minHeight: "40px"
    },
    // clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)",
    // textTransform: "none",
    // marginTop: "10px",
    // fontWeight: 500,
    // fontSize: theme.typography.pxToRem(15),
    // marginRight: theme.spacing(1),
    // color: "#073763",
    // borderRadius: "8px",
    // padding: "0 0",
    // background: theme.additionalColors?.tablightGrey,
    // "&.Mui-selected": {
    //   background: theme.additionalColors?.tablightBlue,
    //   color: "white",
    // },
    // "&.Mui-disabled": {
    //   color: "#E3E3E3",
    // },
    // "&.Mui-focusVisible": {
    //   backgroundColor: "rgba(100, 95, 228, 0.32)",
    // },
  }),
);

export default function PdfWrapper({
  handleStepChange,
  data,
}: PdfWrapperProps) {
  const { watch } = useFormContext();
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const state = data.carts.find((cart: any) => {
    return cart.id === watch("cartId");
  })?.clientDetail?.state;
  const showDocument = useMemo(
    () => legal_cities.filter((element) => element.value === state)?.length > 0,
    [legal_cities.filter((element) => element.value === state)?.length > 0],
  );
  const createDocument = useCreateDocument({
    regenerate: true,
    clientDetailId: showDocument ? watch("clientDetailId") : undefined,
  });

  useEffect(() => {
    if (showDocument == false) setShowModal(true);
  }, []);

  if (showDocument) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <StyledTab
            icon={<AdjustRoundedIcon />}
            iconPosition="start"
            label="View my complete Estate Plan"
            sx={{ minHeight: { xs: "40px", md: "60px" } }}
            {...a11yProps(0)}
          />
          <StyledTab
            icon={<AdjustRoundedIcon />}
            iconPosition="start"
            label="View Sample Quit Claim"
            sx={{ minHeight: { xs: "40px", md: "60px" } }}
            {...a11yProps(1)}
          />
          <Box mt={2} mb={{ xs: 1, md: "auto" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                background: (theme) => theme.palette.error.dark,
              }}
              onClick={handleStepChange}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              width: { xs: "100%", md: "80%" },
              margin: "auto",
            }}
          >
            <Typography variant="h2">
              Your Completed Living Trust and Estate Plan
            </Typography>
            <Typography variant="h5">
              Scroll to view all pages or checkout now{" "}
            </Typography>
          </Box>
          <PdfViewer
            handleStepChange={handleStepChange}
            createDocument={createDocument}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              width: { xs: "100%", md: "80%" },
              margin: "auto",
            }}
          >
            {createDocument?.isFetching ? (
              <Skeleton width={100} />
            ) : (
              <Typography variant="h2">
                Sample Quit Claim for CA residents
              </Typography>
            )}
            {createDocument?.isFetching ? (
              <Skeleton width={100} />
            ) : (
              <Typography variant="h5">
                {" "}
                One well be prepared for each county{" "}
              </Typography>
            )}
          </Box>
          <StaticPdfViewer
            DocType="QuitClaim"
            handleStepChange={handleStepChange}
          />
        </TabPanel>
      </Box>
    );
  } else {
    return (
      <>
        <CustomModal
          width={{ xs: "100%", sm: "500px" }}
          open={showModal}
          handleClose={() => {}}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "80%" },
              margin: "auto",
              textAlign: "center",
            }}
          >
            <Typography variant="h2" sx={{}}>
              Notice for Non-California Residents
              <Typography variant="h3" sx={{ my: 2, fontWeight: "400" }}>
                This is a sample document for your review. Your customized
                document will be prepared manually by our team.
              </Typography>
            </Typography>
            <Zoom
              in={showModal}
              mountOnEnter
              unmountOnExit
              style={{
                transitionDelay: showModal ? "500ms" : "0ms",
              }}
            >
              <Box
                sx={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setShowModal(false)}
                  sx={{ textTransform: "none" }}
                >
                  Continue Reading
                  <AutoStoriesIcon sx={{ ml: 1, fontSize: "20px" }} />
                </Button>
              </Box>
            </Zoom>
          </Box>
        </CustomModal>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            TabIndicatorProps={{
              style: { display: "none" },
            }}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <StyledTab
              icon={<AdjustRoundedIcon />}
              iconPosition="start"
              label="View a sample Estate plan"
              sx={{ minHeight: { xs: "40px", md: "60px" } }}
              {...a11yProps(0)}
            />
            <StyledTab
              icon={<AdjustRoundedIcon />}
              iconPosition="start"
              label="View Sample Quit Claim"
              sx={{ minHeight: { xs: "40px", md: "60px" } }}
              {...a11yProps(1)}
            />
            <Box mt={2} mb={{ xs: 1, md: "auto" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  background: (theme) => theme.palette.error.dark,
                }}
                onClick={handleStepChange}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Tabs>
          <TabPanel value={value} index={0}>
            <Box
              sx={{
                width: { xs: "100%", md: "80%" },
                margin: "auto",
              }}
            >
              <Typography variant="h2">
                A Sample Living Trust Estate Plan
              </Typography>
              <Typography variant="h5">
                {" "}
                Actual Documents will be manually prepared and shipped.{" "}
              </Typography>
            </Box>
            <StaticPdfViewer
              DocType="FullSample"
              handleStepChange={handleStepChange}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box
              sx={{
                width: { xs: "100%", md: "80%" },
                margin: "auto",
              }}
            >
              <Typography variant="h2">
                Sample Quit Claim for CA residents
              </Typography>
              <Typography variant="h5">
                {" "}
                One well be prepared for each county{" "}
              </Typography>
            </Box>
            <StaticPdfViewer
              DocType="QuitClaim"
              handleStepChange={handleStepChange}
            />
          </TabPanel>
        </Box>
      </>
    );
  }
}
