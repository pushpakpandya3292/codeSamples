import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { BoxWrapper, BlueBoxWrapper } from "../../../Styled";
import Image from "next/image";
import LegalShieldImage from "@/assets/img/Legal-Shield.png";
import CustomModal from "@/components/CustomModal";
import CustomButton from "@/components/CustomButton";
import Logo from "@/assets/img/logo.png";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { LegalAdvices } from "@/constants/LegalAdvices";
import { useLegalShield } from "@/provider/LegalSheild";
import { toast } from "react-toastify";
import { useFormContext } from "react-hook-form";

interface LegalAdviceInsuranceProps {
  // Add any props you need for this component
}

const Steps = [
  {
    value: "Click the link",
  },
  {
    value: "Enter your state",
  },
  {
    value: "Pick the $29.99",
  },
  {
    value: "Skip or add extras plans",
  },
  {
    value: "Click the red add to cart button",
  },
  {
    value: "Click Add Contact Information",
  },
  {
    value: "Add Spouse/dependents",
  },
  {
    value: "Add payment",
  },
];
const LegalAdviceInsurance: React.FC<LegalAdviceInsuranceProps> = () => {
  const { watch } = useFormContext();
  const LegalShield = useLegalShield({});
  const handleConfirm = async () => {
    const enroll = await LegalShield.mutateAsync({
      cartId: watch("cartId"),
    });
    if (enroll) {
      toast.success("Email has been sent to you for further instructions");
    }
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ display: "flex", gap: "60px", alignItems: "flex-start" }}>
            <Box>
              <Typography variant="h2">
                LegalShield family plans for $29.99/month
              </Typography>
              <Typography variant="h5">
                {`LegalShield is largest legal plan provider in the US, serving millions
        of families over the last 45 years. Join many families in hiring a state
        based Law Firm to give you phone and email advice and consultation on
        all legal topics.`}
              </Typography>
            </Box>
          </Box>
          <BlueBoxWrapper
            sx={{
              mt: 2,
              display: "flex",
              alignItems: { xs: "start", md: "center" },
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: "10px", sm: "auto" },
            }}
          >
            <Typography variant="h3">
              I am interested in a LegalShield plan.
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{ textTransform: "none" }}
              onClick={handleConfirm}
              disabled={LegalShield.isLoading}
            >
              {LegalShield.isLoading ? (
                <CircularProgress sx={{ color: "white" }} size={20} />
              ) : (
                "Email me"
              )}
            </Button>
          </BlueBoxWrapper>
          <BoxWrapper
            sx={{
              mt: 2,
              mb: 2,
              maxHeight: "370px",
              overflowX: "hidden",
              overflowY: "auto",
              backgroundColor: "#e8e8e8",
            }}
          >
            <Typography variant="h3">
              Each of our plans provide these benefits:
            </Typography>
            {/* {LegalAdvices.map((advice, i) => {
              return (
                <Box key={i} sx={{ mt: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: (theme) => theme.additionalColors?.tablightBlue,
                    }}
                  >
                    {advice.title}
                  </Typography>
                  <Typography variant="h5">{advice.content}</Typography>
                </Box>
              );
            })} */}
            <Box mt={2} pr={2} sx={{ display: "flex" , justifyContent: 'space-between'  , gap: '25px' }}>
              <Box sx={{flex: 1 }} >
                {LegalAdvices.map((advice , i)=>{
                  if(i <= 3) {
                    return (
                      <>
                      <Box mt={2} mb={2} >
                  <Typography
                    variant="h4"
                    sx={{
                      display: 'inline',
                      fontWeight:'bold'
                    }}
                  >
                    {advice.title}
                    <Typography  sx={{display: 'inline' , color: '#000' , fontWeight: 400}  }  > {advice.content}</Typography>
                  </Typography>
                  
                </Box>
                      </>
                    )
                  }
                })}
              </Box>
              <Box sx={{flex: 1}} >
                {LegalAdvices.map((advice , i)=>{
                  if(i > 3) {
                    return (
                      <>
                      <Box mt={2} mb={2} >
                  <Typography
                    variant="h4"
                    sx={{
                      display: 'inline',
                      fontWeight:'bold'
                    }}
                  >
                    {advice.title}
                    <Typography  sx={{display: 'inline' , color: '#000' , fontWeight: 400}  }  > {advice.content}</Typography>
                  </Typography>
                  
                </Box>
                      </>
                    )
                  }
                })}
              </Box>
            </Box>
          </BoxWrapper>
        </Grid>
        {/* <Grid item xs={12} lg={4}> */}
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 0.5,
            }}
          >
            <Image
              src={LegalShieldImage}
              alt="legal Shield"
              style={{
                width: "100%",
                maxWidth: "430px",
                height: "90%",
                maxHeight: "550px",
              }}
            /> */}
            {/* <Link
              href={"/Legal-Shield-Benefits-Summary-2023.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              locale={false}
            >
              <Button
                variant="contained"
                size="small"
                color="error"
                sx={{ textTransform: "none" }}
              >
                Click to Download
              </Button>
            </Link> */}
          {/* </Box> */}
        {/* </Grid> */}
      </Grid>
    </>
  );
};

export default LegalAdviceInsurance;
