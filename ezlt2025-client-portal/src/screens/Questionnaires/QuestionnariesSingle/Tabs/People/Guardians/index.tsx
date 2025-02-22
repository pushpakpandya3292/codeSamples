import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  BoxWrapper,
  ToggleBox,
} from "@/screens//Questionnaires/QuestionnariesSingle/Styled";
import AddTrustee from "./AddTrustee";
import { Controller, useFormContext } from "react-hook-form";
import {
  TrusteeChildRealtionEnum,
  TrusteeRealtionWithPersonEnum,
} from "../../../constants";
import CustomizedSwitches from "@/components/CustomSwitch";

const Guardians: React.FC = () => {
  const { getValues, control, setValue, watch } = useFormContext();
  const {
    primary_guardian_full_name,
    primary_trustee_guardian_relation,
    backup_guardian_full_name,
    backup_trustee_guardian_relation,
    living_childern_details,
  } = getValues();
  const [openPrimary, setOpenPrimary] = useState(false);
  const [openSecondary, setOpenSecondary] = useState(false);

  useEffect(() => {
    if (living_childern_details) {
      const children = living_childern_details.filter(
        (child: any) => child.age < 18,
      );
      if (children.length > 0) {
        setValue("isChildUnderAge", true);
      } else {
        setValue("isChildUnderAge", false);
      }
    }
  }, []);

  const handlePrimaryOpen = () => {
    setOpenPrimary(true);
  };
  const handleSecondaryOpen = () => {
    setOpenSecondary(true);
  };
  const handlePrimaryClose = () => {
    setOpenPrimary(false);
  };
  const handleSecondaryClose = () => {
    setOpenSecondary(false);
  };
  return (
    <Box>
      <Typography sx={{ pb: 2 }} variant="h2">
        Guardians
      </Typography>
      {watch("isChildUnderAge") ? (
        <Grid container spacing={3}>
          <Grid xs={12} md={6} item>
            <BoxWrapper sx={{ p: 2 }}>
              <Typography sx={{ pb: 1 }} variant="h3">
                Select guardians for minor children
              </Typography>

              <Box sx={{ pb: 3 }}>
                <Typography sx={{ mb: 1 }} variant="h3">
                  First Alternate Guardian
                </Typography>
                <Box
                  sx={{
                    my: 1,
                    background: (theme) => theme.additionalColors?.formInputBg,
                    height: "40px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                  }}
                >
                  <Typography variant="body1">
                    {primary_guardian_full_name &&
                    primary_guardian_full_name !== ""
                      ? `${primary_guardian_full_name},
                  ${
                    TrusteeChildRealtionEnum[
                      primary_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                    ]
                      ? TrusteeChildRealtionEnum[
                          primary_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                        ]
                      : TrusteeRealtionWithPersonEnum[
                          primary_trustee_guardian_relation as keyof typeof TrusteeRealtionWithPersonEnum
                        ]
                  }`
                      : "No First Alternate Guardian"}
                  </Typography>
                  <Button
                    onClick={handlePrimaryOpen}
                    variant="contained"
                    sx={{
                      background: (theme) => theme.additionalColors?.lightBlue,
                      height: "26px",
                      boxShadow: "none",
                      color: "#333",
                      textTransform: "capitalize",
                      ":hover": {
                        background: (theme) =>
                          theme.additionalColors?.lightBlue,
                      },
                    }}
                  >
                    {primary_guardian_full_name &&
                    primary_guardian_full_name !== ""
                      ? `Change`
                      : "Add"}
                  </Button>
                </Box>
              </Box>
              <Box sx={{ pb: 3 }}>
                <Typography sx={{ mb: 1 }} variant="h3">
                  Second Alternate Guardian
                </Typography>
                <Box
                  sx={{
                    my: 1,
                    background: (theme) => theme.additionalColors?.formInputBg,
                    height: "40px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                  }}
                >
                  <Typography variant="body1">
                    {backup_guardian_full_name &&
                    backup_guardian_full_name !== ""
                      ? `${backup_guardian_full_name},
                  ${
                    TrusteeChildRealtionEnum[
                      backup_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                    ]
                      ? TrusteeChildRealtionEnum[
                          backup_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                        ]
                      : TrusteeRealtionWithPersonEnum[
                          backup_trustee_guardian_relation as keyof typeof TrusteeRealtionWithPersonEnum
                        ]
                  }`
                      : "No Second Alternate Guardian"}
                  </Typography>
                  <Button
                    onClick={handleSecondaryOpen}
                    variant="contained"
                    sx={{
                      background: (theme) => theme.additionalColors?.lightBlue,
                      height: "26px",
                      boxShadow: "none",
                      color: "#333",
                      textTransform: "capitalize",
                      ":hover": {
                        background: (theme) =>
                          theme.additionalColors?.lightBlue,
                      },
                    }}
                  >
                    {backup_guardian_full_name &&
                    backup_guardian_full_name !== ""
                      ? `Change`
                      : "Add"}
                  </Button>
                </Box>
              </Box>
            </BoxWrapper>
          </Grid>
        </Grid>
      ) : (
        // <Box
        //   sx={{
        //     px: 0.3,
        //     display: "flex",
        //     flexDirection: "column",
        //     gap: "15px",
        //   }}
        // >
        //   {living_childern_details.length > 0 && (
        //     <>
        //       <Box>
        //         <Typography variant="h3" sx={{ mb: 1 }}>
        //           Children
        //         </Typography>
        //         {living_childern_details.map((child: any, index: number) => (
        //           <Typography variant="h5" key={index}>
        //             {child.full_Name},
        //             {
        //               TrusteeChildRealtionEnum[
        //               child.primary_trustee_child_relation as keyof typeof TrusteeChildRealtionEnum
        //               ]
        //             }
        //             , Age
        //             {child.age}
        //           </Typography>
        //         ))}
        //       </Box>
        //     </>
        //   )}
        //   <Box>
        //     <Typography
        //       variant="h3"
        //       sx={{ color: (theme) => theme.palette.primary.main }}
        //     >
        //       None of your children are under the age of 18 and require a
        //       guardian.
        //     </Typography>
        //     <Typography variant="h5" sx={{ mt: 1 }}>
        //       You can skip this section since you don’t have any children under
        //       18.
        //     </Typography>
        //   </Box>
        //   <Box sx={{ maxWidth: "50%" }}>
        //     <ToggleBox
        //       sx={{
        //         display: "flex",
        //         alignItems: "center",
        //         justifyContent: "space-between",
        //       }}
        //     >
        //       <Typography variant="h4">
        //         Would you still like to add guardians?
        //       </Typography>
        //       <Controller
        //         name={"isChildUnderAge"}
        //         control={control}
        //         render={({ field, fieldState: { error } }) => (
        //           <CustomizedSwitches
        //             {...field}
        //             setChecked={(value: boolean) => {
        //               setValue("isChildUnderAge", value);
        //             }}
        //             checked={watch("isChildUnderAge")}
        //           />
        //         )}
        //       />
        //     </ToggleBox>
        //   </Box>
        // </Box>
        <Box
          sx={{
            px: 0.3,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              Skip This Section
            </Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              Since you have no children under 18, there is no need to select
              guardians.
            </Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              However, in Section 2C of your Last Will, you can write in a
              Guardian should you have child or adopt a child in the future.
            </Typography>
          </Box>
        </Box>
      )}
      <AddTrustee
        open={openPrimary}
        handleClose={handlePrimaryClose}
        title="Select First guardian"
        secondryTitle="Add First guardian"
        isPrimary={true}
      />
      <AddTrustee
        open={openSecondary}
        handleClose={handleSecondaryClose}
        title="Select Second guardian"
        secondryTitle="Add Second guardian"
        isPrimary={false}
      />
    </Box>
  );
};

export default Guardians;
