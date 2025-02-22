import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomizedSwitches from "@/components/CustomSwitch";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import {
  BoxWrapper,
  ToggleBox,
} from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import CustomRadioButton from "@/components/CustomRadioButton";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import { DeliveryOptionEnum, MailingAddressEnum } from "../../../constants";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import RecommendedChip from "@/components/RecommendedChip";
import dayjs from "dayjs";
import CustomModal from "@/components/CustomModal";
import CustomButton from "@/components/CustomButton";
import CloseIcon from "@mui/icons-material/Close";
import CustomeDateTimePicker, {
  renderDateFieldProps,
} from "@/components/CustomDateTimePicker";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";

function SigningDate() {
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  const [openModal, setOpenModal] = useState(false);

  const handleSubmitDate = async () => {
    const isValid = await trigger();
    if (isValid) setOpenModal(false);
  };

  const handleCloseModal = () => {
    if (!watch("signing_date_field")) {
      setValue("signing_date", "no");
      setValue("signing_date_field", "");
    }
    if (!errors?.signing_date_field || !watch("signing_date_field"))
      setOpenModal(false);
  };

  return (
    <Box>
      <Box>
        <Typography variant="h2">Exact Signature Date</Typography>
        {/* <List dense sx={{ h5: { lineHeight: "1" } }}>
            <ListItem> */}
        <Typography variant="h5">
          If you know the exact date you will notarize the documents in the near
          future, we can pre-print that date on all the documents. Otherwise, it
          will be left blank to manually enter the date.
        </Typography>
        {/* </ListItem>
          </List> */}
      </Box>
      <BoxWrapper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          width: { xs: "100%", md: "70%" },
          mt: 2,
        }}
      >
        <Box>
          <Controller
            name={"signing_date"}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <RadioGroup
                {...field}
                onChange={(e) => {
                  setValue("signing_date", e.target.value);
                  if (e.target.value === "yes") {
                    setOpenModal(true);
                  } else if (e.target.value === "no") {
                    setOpenModal(false);
                    setValue("signing_date_field", "");
                  }
                }}
              >
                <CustomRadioButton
                  value={"no"}
                  label={
                    <>
                      <strong>Skip / Leave Blank </strong> <RecommendedChip />
                    </>
                  }
                />
                <CustomRadioButton
                  value={"yes"}
                  label={
                    <>
                      <strong>Pre-print</strong> (enter the date below if you
                      know the exact date documents will be notarized)
                    </>
                  }
                />
                {error?.message && (
                  <CustomErrorMessage error={error?.message ?? {}} />
                )}
              </RadioGroup>
            )}
          />
        </Box>
        {watch("signing_date_field") && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
              borderRadius: "10px",
              background: "#F5F5F5",
              p: 2,
            }}
          >
            <Typography>
              Document Sign date :{" "}
              {dayjs(watch("signing_date_field")).format("MM/DD/YYYY")}
            </Typography>{" "}
            <BorderColorTwoToneIcon
              color="primary"
              onClick={() => {
                setOpenModal(true);
              }}
              sx={{
                background: (theme) =>
                  theme.additionalColors?.background.tertiary,
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "26px",
                p: "4px",
              }}
            />
          </Box>
        )}
      </BoxWrapper>
      <CustomModal width={{ xs: "100%", sm: "350px" }} open={openModal} handleClose={handleCloseModal}>
        <Box>
          <Box sx={{ textAlign: "end" }}>
            <CloseIcon
              onClick={handleCloseModal}
              sx={{ cursor: "pointer", mb: 1 }}
            />
          </Box>
          <Typography sx={{ mb: 2 }} variant="body1">
            Date the documents are to be signed
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Controller
              name={"signing_date_field"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomeDateTimePicker
                  {...field}
                  {...renderDateFieldProps(error)}
                  minDate={dayjs()}
                  label={"Signing Date"}
                />
              )}
            />
            <CustomButton type="ADD" onClick={handleSubmitDate}>
              Save
            </CustomButton>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
}

export default SigningDate;

// import React, { useEffect, useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import { Box, Typography } from "@mui/material";
// import dayjs from "dayjs";
// import CustomizedSwitches from "@/components/CustomSwitch";
// import {
//   BoxWrapper,
//   ToggleBox,
// } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
// import CustomModal from "@/components/CustomModal";
// import CustomButton from "@/components/CustomButton";
// import CloseIcon from "@mui/icons-material/Close";
// import CustomeDateTimePicker, {
//   renderDateFieldProps,
// } from "@/components/CustomDateTimePicker";

// function SigningDate() {
//   const { control, watch, setValue, trigger } = useFormContext();
//   const [isSigningDate, setIsSigningDate] = useState(
//     watch("signing_date") === "yes" ? true : false,
//   );
//   const [openModal, setOpenModal] = useState(false);

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setIsSigningDate(!watch("signing_date"));
//   };
//   useEffect(() => {
//     if (isSigningDate && !watch("signing_date_field")) {
//       setValue("signing_date", "yes");
//       setOpenModal(true);
//     } else if (isSigningDate) {
//     } else {
//       setValue("signing_date", "no");
//       setValue("signing_date_field", "");
//     }
//   }, [isSigningDate]);

//   const handleSubmitDate = async () => {
//     const isValid = await trigger();
//     if (isValid) setOpenModal(false);
//   };

//   return (
//     <>
//       <BoxWrapper
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           gap: "10px",
//           width: "70%",
//         }}
//       >
//         <Typography variant="body2">Signing Date</Typography>
//         <Typography variant="h5">
//           We can add a specific date to your documents. It is recommended to
//           leave it blank in case you or your Notary are unable to make the
//           appointment. Your Notary can enter the date manually.
//         </Typography>
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//           }}
//         >
//           <ToggleBox
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Typography variant="h4">
//               Add a specific signing date to your legal documents?
//             </Typography>
//             <CustomizedSwitches
//               checked={isSigningDate}
//               setChecked={setIsSigningDate}
//             />
//           </ToggleBox>
//           {watch("signing_date_field") && (
//             <Typography>
//               {" "}
//               Document Sign date :{" "}
//               {dayjs(watch("signing_date_field")).format("MM/DD/YYYY")}
//             </Typography>
//           )}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               gap: "15px",
//             }}
//           >
//             <Typography variant="h5">
//               <span style={{ fontWeight: "700" }}>OUR OFFICE</span> - If you are
//               planning to come to our office in South Pasadena, CA, to Notarize,
//               we can add the date of your scheduled appointment..
//             </Typography>
//           </Box>
//         </Box>
//       </BoxWrapper>
//       <CustomModal width={350} open={openModal} handleClose={handleCloseModal}>
//         <Box>
//           <Box sx={{ textAlign: "end" }}>
//             <CloseIcon
//               onClick={handleCloseModal}
//               sx={{ cursor: "pointer", mb: 1 }}
//             />
//           </Box>
//           <Typography sx={{ mb: 2 }} variant="body1">
//             Date the documents are to be signed
//           </Typography>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//             <Controller
//               name={"signing_date_field"}
//               control={control}
//               render={({ field, fieldState: { error } }) => (
//                 <CustomeDateTimePicker
//                   {...field}
//                   {...renderDateFieldProps(error)}
//                   minDate={dayjs()}
//                   label={"Signing Date"}
//                 />
//               )}
//             />
//             <CustomButton type="ADD" onClick={handleSubmitDate}>
//               Save
//             </CustomButton>
//           </Box>
//         </Box>
//       </CustomModal>
//     </>
//   );
// }

// export default SigningDate;
