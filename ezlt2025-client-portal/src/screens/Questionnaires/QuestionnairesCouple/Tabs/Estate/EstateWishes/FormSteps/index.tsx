import React , {useEffect, useState} from "react";
import SuccessorTrustee from "./SuccessorTrustee";
import Division from "./Division";
import AnythingYouWouldLikeToAdd from "./AnythingYouWouldLikeToAdd";
import TrusteeAndProfessional from "./TrusteeAndProfessional";
import DebtsOrLoans from "./DebtsOrLoans";
import BusinessesAndSocialMedia from "./BusinessesAndSocialMedia";
import Wishes from "./Wishes";
import Retirement from "./Retirement";
import GiftsToOther from "./GiftsToOther";
import { WishesEnum } from "@/screens/Questionnaires/QuestionnariesSingle/constants";
import { Typography } from "@mui/material";

interface StepTypes {
  step: number;
  handleOpen: () => void;
  handleClose: () => void;
  playlistVideo: any
}
export const boxStyling = { display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "25px" }
export const checkBoxSecStyling = { display: "flex", flexDirection: "column", }
function WizardForm({ step, handleOpen, handleClose }: StepTypes) {

  switch (step) {
    default:
      return (
        <SuccessorTrustee
          title="Successor Trustee’s responsibilities"
          videoUrl={"xxxxx"}
          fieldName={WishesEnum[0]}
          placeholder="Type here or copy sample answer..."
        />
      );

    case 2:
      return (
        <Division
          title="Division of properties and tangible assets"
          videoUrl={"xxxxx"}
          fieldName={WishesEnum[1]}
          placeholder="Type here or copy sample answer..."
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      );
    case 3:
      return (
        <GiftsToOther
          title="Gifts to other people or charities"
          videoUrl={"xxxxx"}
          fieldName={WishesEnum[2]}
          placeholder="Type here or copy sample answer..."
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      );
    case 4:
      return (
        <Retirement
          title="Retirement, life insurance and other investments"
          fieldName={WishesEnum[3]}
          videoUrl={"xxxxx"}
          placeholder="Type here or copy sample answer..."
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      );
    case 5:
      return (
        <Wishes
          title="Wishes for Pets"
          fieldName={WishesEnum[4]}
          videoUrl={"xxxxx"}
          placeholder="Type here or copy sample answer..."
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      );
    case 6:
      return (
        <BusinessesAndSocialMedia
          title="Businesses and Social Media"
          fieldName={WishesEnum[5]}
          videoUrl={"xxxxx"}
          placeholder="Type here or copy sample answer..."
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      );
    case 7:
      return (
        <DebtsOrLoans
          title="Debts or Loans"
          fieldName={WishesEnum[6]}
          videoUrl={"xxxxx"}
          placeholder="Type here or copy sample answer..."
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      );
    case 8:
      return (
        <TrusteeAndProfessional
          title="Trustee and Professional Compensation "
          fieldName={WishesEnum[7]}
          videoUrl={"xxxxx"}
          placeholder="Type here or copy sample answer..."
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      );
    case 9:
      return (
        <AnythingYouWouldLikeToAdd
          title="Additional wishes: (Is there anything you would like to add?)"
          fieldName={WishesEnum[8]}
          placeholder="Type here or copy sample answer..."
        />
      );
  }
}

function NoteText() {
  return (
    <Typography sx={{ fontSize: "12px", marginBottom: "5px" }}>NOTE* : Review carefully, edit and customize to your needs</Typography>
  )
}
export { NoteText };
export default WizardForm;