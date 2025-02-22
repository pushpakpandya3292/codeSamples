"use client";
import Pageheader from "@/components/PageHeader";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DragAndDropSampleAnswers } from "@/components/DragAndDrop";
import { CardContainer } from "../StyledComponent";
import SampleAnswerPreview from "../preview";
import { Add, CheckBox } from "@mui/icons-material";
import { toast } from "react-toastify";
import { MarriageStatusEnum } from "@/constant";
import CustomCheckBox from "@/components/CustomCheckBox";
import AddSampleAnswer from "./AddSampleAnswer";
import SampleAnswerMartitalStatus from "./SampleAnswerMartitalStatus";
import {
  useAddSampleAnswerDetails,
  useDeleteSampleAnswerDetails,
  useSampleAnswerDetailsListing,
  useUpdateSampleAnswerDetails,
} from "@/provider/SampleAnswer";
import CustomModal from "@/components/CustomModal";
import CustomButton from "@/components/CustomButton";

const SampleAnswersData = {
  data: {
    data: [
      {
        title: "Gift something unique to a specific child",
        description:
          "We direct the Trustee to gift **CHILD NAME** specifically **ITEM NAME, $___, OR SPECIFIC ASSET**.",
      },
      {
        title:
          "I have no children and wish to leave to others in different percentages",
        description:
          "After all final expenses are paid, we leave our primary, investment properties and other personal and tangible assets in the following percentages to the following people: **NAME1, RELATIONSHIP TO US, ___%, NAME2, RELATIONSHIP TO US, ___%**. We grant the Trustee full authority to determine how to expeditiously distribute the Trust Estate assets.",
      },
      {
        title:
          "Equally divide my remaining assets to my children. Their share goes to their children if they die",
        description:
          "After all final expenses are paid, we leave my remaining estate including our primary residence, investment properties and all personal tangible effects to my **ADD NAMES OF CHILDREN HERE** to be divided in equal shares. If any of our children named above should die before the estate assets are distributed, their share shall be passed on to any other of their surviving children in equal shares. Should there be no clear consensus or there is significant disagreement, I grant the Trustee full authority to determine how to expeditiously distribute the Trust Estate assets.",
      },
    ],
  },
};
interface SampleAnswersDetailsProps {
  sampleAnswerCategory: string;
}

const SampleAnswersDetails = ({
  sampleAnswerCategory,
}: SampleAnswersDetailsProps) => {
  const [martialStatus, setMartialStatus] = useState(MarriageStatusEnum.Single);
  const addSampleAnswerDetails = useAddSampleAnswerDetails({});
  const updateSampleAnswerDetails = useUpdateSampleAnswerDetails({});
  const deleteSampleAnswerDetails = useDeleteSampleAnswerDetails({});
  const sampleAnswerDetailsListing = useSampleAnswerDetailsListing({
    category: sampleAnswerCategory,
    marriageStatus: martialStatus,
  });
  const [showSampleAnswerDetail, setShowSampleAnswerDetail] = useState(
    new Array(sampleAnswerDetailsListing.data?.length).fill(false),
  );
  const [isAddingSampleAnswer, setisAddingSampleAnswer] = useState(false);
  const [deleteSampleAnswerModal, setDeleteSampleAnswerModal] = useState(false);
  const [deleteSampleAnswerPayload, setDeleteSampleAnswerPayload] = useState(
    {},
  );
  const handleCollapse = (_index: number) => {
    const newShowSampleAnswerDetail = [...showSampleAnswerDetail];
    newShowSampleAnswerDetail[_index] = !newShowSampleAnswerDetail[_index];
    setShowSampleAnswerDetail(newShowSampleAnswerDetail);
  };

  const handleCloseDeleteModal = () => {
    setDeleteSampleAnswerPayload({});
    setDeleteSampleAnswerModal(false);
  };
  const handleOpenDeleteModal = (newAnswer: any) => {
    setDeleteSampleAnswerPayload(newAnswer);
    setDeleteSampleAnswerModal(true);
  };

  const handleDeleteSampleAnswer = async (newAnswer: any) => {
    try {
      const result = await deleteSampleAnswerDetails.mutateAsync({
        id: newAnswer.id,
      });
      if (result) {
        toast.success("Sample answer removed successfully!");
        handleCloseDeleteModal();
      }
    } catch (error) {
      handleCloseDeleteModal();
      toast.error("An error occurred while removing Sample Answer.");
    }
  };

  const handleAddSampleAnswer = async (newAnswer: any) => {
    try {
      const result = await addSampleAnswerDetails.mutateAsync({
        data: {
          title: newAnswer.title,
          answer: newAnswer.answer,
          category: decodeURIComponent(sampleAnswerCategory),
          marriageStatus: martialStatus,
          order: sampleAnswerDetailsListing.data?.length || 0,
        },
      });
      if (result) {
        toast.success("Sample Answer added successfully!");
        setisAddingSampleAnswer(false);
      }
      return true;
    } catch (error) {
      toast.error("An error occurred while adding Sample Answer.");
      setisAddingSampleAnswer(false);
      return false;
    }
  };
  const handleUpdateSampleAnswer = async (newAnswer: any, index: number) => {
    try {
      const result = await updateSampleAnswerDetails.mutateAsync({
        id: newAnswer.id,
        data: {
          title: newAnswer.title,
          answer: newAnswer.answer,
          category: newAnswer.category,
          marriageStatus: newAnswer.marriageStatus,
          order: index - 1,
        },
      });
      if (result) {
        toast.success("Sample Answer update successfully!");
        setisAddingSampleAnswer(false);
      }
      return true;
    } catch (error) {
      toast.error("An error occurred while updating Sample Answer.");
      setisAddingSampleAnswer(false);
      return false;
    }
  };

  const handleMartialStatus = (status: MarriageStatusEnum) => {
    setMartialStatus(status);
  };

  const reOrderSampleAnswers = async (_sampleAnswers: any) => {
    try {
      const promises = _sampleAnswers?.map((el: any) => {
        return updateSampleAnswerDetails.mutateAsync({
          id: el.id,
          data: {
            title: el.title,
            answer: el.answer,
            category: el.category,
            marriageStatus: el.marriageStatus,
            order: el.order,
          },
        });
      });
      const results = await Promise.all(promises);
      const hasErrors = results.some((result) => result === false);
      if (!hasErrors) {
        toast.success("Sample Answer reordered successfully!");
      } else {
        toast.error("Sample Answer reordered failed.");
      }
    } catch (error) {
      toast.error("An error occurred while reordering Sample Answer.");
    }
  };

  return (
    <Box>
      <Pageheader title="Sample Answers" isBack />
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <CardContainer
            sx={{
              padding: 0,
            }}
          >
            <Box
              sx={{
                // pb: 1,
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: (theme) => theme.additionalColors?.lightGrey,
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    color: (theme) => theme.palette.text.primary,
                    display: "flex",
                    fontSize: "24px",
                  }}
                >
                  Sample Answer Editor
                </Typography>
                <SampleAnswerMartitalStatus
                  handleMartialStatus={handleMartialStatus}
                  martialStatus={martialStatus}
                />
              </Box>
              <Button
                variant="contained"
                color={isAddingSampleAnswer ? "error" : "primary"}
                onClick={() => setisAddingSampleAnswer(!isAddingSampleAnswer)}
              >
                {isAddingSampleAnswer ? "Cancel" : "Add Sample Answer"}
              </Button>
            </Box>
            {sampleAnswerDetailsListing.isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: "200px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ p: 2 }}>
                <AddSampleAnswer
                  onAddSampleAnswer={handleAddSampleAnswer}
                  isAddingSampleAnswer={isAddingSampleAnswer}
                  isLoading={addSampleAnswerDetails.isLoading}
                />
                {!sampleAnswerDetailsListing.data?.length ? (
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", py: 2, color: "grey" }}
                  >
                    No sample answers found
                  </Typography>
                ) : (
                  <DragAndDropSampleAnswers
                    sampleAnswerDetails={sampleAnswerDetailsListing}
                    onSortEnd={reOrderSampleAnswers}
                    showSampleAnswerDetail={showSampleAnswerDetail}
                    handleCollapse={handleCollapse}
                    handleDeleteSampleAnswer={handleOpenDeleteModal}
                    updateSampleAnswerDetailsToList={handleUpdateSampleAnswer}
                    updateSampleAnswerLoading={
                      updateSampleAnswerDetails.isLoading
                    }
                  />
                )}
              </Box>
            )}
          </CardContainer>
        </Grid>
        <Grid item xs={12} md={7}>
          <CardContainer>
            {sampleAnswerDetailsListing.isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: "200px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <SampleAnswerPreview
                SampleAnswerlisting={sampleAnswerDetailsListing.data}
              />
            )}
          </CardContainer>
        </Grid>
      </Grid>
      <CustomModal
        width="400px"
        open={deleteSampleAnswerModal}
        handleClose={handleCloseDeleteModal}
      >
        <Typography variant="h6">
          Are you sure to remove sample answer from list?
        </Typography>
        <Box display={"flex"} gap={"30px"}>
          <CustomButton
            type="CANCEL"
            onClick={handleCloseDeleteModal}
            disabled={deleteSampleAnswerDetails.isLoading}
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="ADD"
            onClick={() => handleDeleteSampleAnswer(deleteSampleAnswerPayload)}
            disabled={deleteSampleAnswerDetails.isLoading}
          >
            {deleteSampleAnswerDetails.isLoading ? (
              <CircularProgress size={20} color="error" />
            ) : (
              "Delete"
            )}
          </CustomButton>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default SampleAnswersDetails;
