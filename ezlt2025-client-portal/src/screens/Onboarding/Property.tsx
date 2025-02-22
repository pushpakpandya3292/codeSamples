import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import CustomSwitch from "@/components/OnboardingCard/Switch";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { useCreateClientCache } from "@/provider/ClientCache";
import { OnboardingFormikPropInterface } from "./constant";
import ActionButton from "./ActionButton";
import { toast } from "react-toastify";
import { useUserDetailListing } from "@/provider/profile";
import { DEMO_USER } from "../../../config";
import CustomizedSwitches from "@/components/CustomSwitch";

interface PropertyPropInterface {
  formik: FormikProps<OnboardingFormikPropInterface>;
  handleNext: () => void;
  step: number;
  handleBack: () => void;
}

const Property = ({
  handleBack,
  handleNext,
  formik,
}: PropertyPropInterface) => {
  const creatCache = useCreateClientCache({});
  const profileDetail = useUserDetailListing({ isValid: true });
  const [protect, setProtect] = useState(formik.values.protect_home);
  useEffect(() => {
    formik.setValues({
      ...formik.values,
      protect_home: protect,
    });
  }, [protect]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
        <Image
          src={Logo}
          alt=""
          style={{ width: "326px", height: "50px", alignSelf: "center" }}
        />
        <Box
          sx={{
            background: (theme) => theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "58px",
            mt: "20px",
          }}
        >
          <Typography
            sx={{ fontSize: "32px", fontWeight: "600", color: "#FFF" }}
          >
            Properties
          </Typography>
        </Box>
        <Box sx={{ mx: 6, mt: 2, textAlign: "center" }}>
          <Box
            sx={{
              background: "#fff",
              borderRadius: "12px",
              p: 2,
              boxShadow: "0 0 11px #eee",
            }}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
              Would you like us to prepare the County recording documents for
              your Primary home (included)?
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
                pb: 3,
              }}
            >
              {/* <Typography
              sx={{
                mr: 1,
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              No
            </Typography> */}
              {/* <CustomSwitch checked={protect} setChecked={setProtect} /> */}
              <CustomizedSwitches setChecked={setProtect} checked={protect} />
              {/* <Typography
              sx={{
                ml: 1,
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Yes
            </Typography> */}
            </Box>
            {protect ? (
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#A3A5A7",
                  fontWeight: 500,
                  maxWidth: "650px",
                  margin: "0 auto",
                }}
              >
                We will custom prepare Quit Claim deed that will be included in
                your Estate Planning binder. This will protect your property
                from probate by transferring the title from your personal name
                to your Revocable Living Trust name.
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#A3A5A7",
                  fontWeight: 500,
                  maxWidth: "650px",
                  margin: "0 auto",
                }}
              >
                We’ll assume you are currently renting or your home is already
                in a Trust.
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              background: "#fff",
              borderRadius: "12px",
              p: 2,
              boxShadow: "0 0 11px #eee",
              mt: 2,
            }}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: "700", mb: 4 }}>
              How many investment properties do you want to add ($100 each)?
            </Typography>
            <CustomTextField
              sx={{ width: "100px" }}
              type="number"
              {...renderFieldProps()}
              InputProps={{ inputProps: { min: 0, max: 3 } }}
              defaultValue={0}
              value={formik.values.no_of_investment_property}
              name="no_of_investment_property"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (Number(e.target.value) > 3) {
                  formik.setFieldValue("no_of_investment_property", 3);
                  toast.error("Investment properties should be between 0 to 3");
                } else if (e.target.value === "") {
                  formik.setFieldValue("no_of_investment_property", 0);
                } else {
                  formik.handleChange(e);
                }
              }}
            />
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#A3A5A7" }}
            >
              Maximum 3
            </Typography>
            {/* <Typography sx={{ color: "#ED7D2B", mt: 2, fontWeight: 400 }}>
              For additional properties, you can select the Quit Claims Package
              at a later date.
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#A3A5A7",
                fontWeight: 500,
                maxWidth: "650px",
                margin: "0 auto",
                lineHeight: "normal",
                mt: 6,
                fontStyle: "italic",
              }}
            >
              Government quit claim filing fees vary by state and county. You
              can personally file your Quit Claim, or we will recommend an
              expert title service that can file it for a nominal filing and
              tracking fee.
            </Typography> */}
          </Box>
        </Box>
      </Box>
      <ActionButton
        isNext
        isPrev
        handleNext={() => {
          creatCache.mutate({
            key: `ONBOARDING${profileDetail.data?.id}${
              profileDetail?.data?.carts?.length || 0
            }`,
            data: formik.values,
            form_type: 1,
          });
          handleNext();
        }}
        handlePrev={handleBack}
      />
    </Box>
  );
};

export default Property;
