"use client";

import { api } from "@/axios";
import { STATUS_TEXT, TECHNICAL_SKILLS, TECHNOLOGIES } from "@/utils/constants";
import restcountries from "@/utils/restcountries.json";
import { useToast } from "@/utils/toast";
import { faFile } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip, Stack, TextField, Typography } from "@mui/material";
import {
  Application,
  ApplicationStatus,
  ContractStatus,
  PositionType,
  SkillsRating,
} from "@prisma/client";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RatingInput from "../Careers/Rating";
import Avatar from "../Common/Avatar";
import LoadingButton from "../Common/LoadingButton";
import TestViewModel from "./TestViewModel";
import { IAnsweredTask } from "@/context/taskContext";
import { faDownload, faEdit } from "@fortawesome/pro-solid-svg-icons";
import ContractModel from "./ContractModel";

interface Props {
  application: {
    user: {
      photo: string | null;
    };
    position: {
      title: string;
      type: PositionType;
    };
  } & Application;
}

const ApplicationReview = ({ application }: Props) => {
  const [viewTest, setViewTest] = useState<IAnsweredTask | null>(null)
  const [editInterviewNote, setEditInterviewNote] = useState(false)
  const [interviewNotes, setInterviewNotes] = useState(
    application.interviewNotes ?? ""
  );
  const [submitting, setSubmitting] = useState({ loading: false, status: '' });
  const [interviewing, setInterviewing] = useState(false);
  const [adminRatings, setAdminRatings] = useState<SkillsRating[]>(
    application.adminRatings ?? []
  );
  const [updateContract, setUpdateContract] = useState({ loading: false, status: '' })
  const [openContract, setOpenContract] = useState(false);
  const [contractDocument, setContractDocument] = useState<File | null>(null);
  const { showToast } = useToast();
  const router = useRouter();

  const answeredTasks = application.answeredTasks

  const country = restcountries.find(
    (e) => e.cca2 === application.personalInformation.country
  );
  const phoneCountry = restcountries.find(
    (e) => e.cca2 === application.personalInformation.phoneCountry
  );

  const updateApplication = async (payload: object) => {
    const response: AxiosResponse<{
      application: Application;
      message: string;
    }> = await api.post(
      `/api/careers/${application.positionId}/${application.userId}`,
      payload
    );
    return response;
  }

  const interview = async () => {
    setInterviewing(true);
    const response = await updateApplication({
      interviewed: true,
      interviewNotes,
    })
    if (response.status === 200) {
      router.refresh()
      showToast("success", response.data.message);
      setEditInterviewNote(false)
      setInterviewing(false);
    }
  };

  async function blobUrlToBase64(blobUrl: Blob) {
    try {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          const result = reader?.result as string;
          const base64data = result?.split(',')?.[1];
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blobUrl);
      });
    } catch (error) {
      console.error('Error converting Blob URL to Base64:', error);
      throw error;
    }
  }

  const submit = async (status: ApplicationStatus) => {
    setSubmitting({ loading: true, status });

    let base64File: string | null = null;
    if (contractDocument) {
      const blob = new Blob([contractDocument as File], { type: contractDocument?.type });
      await blobUrlToBase64(blob)
        .then((base64data: any) => {
          base64File = base64data
        })
    }

    const response = await updateApplication({
      status,
      ...(status === 'accepted' && contractDocument && {
        contractFile: base64File
      })
    })
    if (response.status === 200) {
      showToast("success", response.data.message);
      handleCloseContractModel()
      router.push("/admin/careers");
    }
    setSubmitting({ loading: false, status: '' });
  };

  const updateContractStatus = async (status: ContractStatus) => {
    setUpdateContract({ loading: true, status });
    const payload = {
      contractStatus: status,
      ...(status === "accepted" && { status: 'hired' })
    }
    const response = await updateApplication(payload)
    if (response.status === 200) {
      router.refresh()
      showToast("success", response.data.message);
    }
    setUpdateContract({ loading: false, status: '' });
  }

  const handleChangeFile = (file: File | null) => {
    setContractDocument(file)
  }

  const handleCloseContractModel = () => {
    if (!submitting.loading) {
      setOpenContract(false)
      setContractDocument(null)
    }
  }

  useEffect(() => {
    if (adminRatings !== application.adminRatings) {
      updateApplication({ adminRatings })
        .then((_) => {
          router.refresh();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminRatings]);

  return (
    <Stack gap={6}>
      <Stack gap={1}>
        <Typography variant="headlinelg" color="var(--text-title)">
          Review Application
        </Typography>
        <Typography variant="labellg">
          Review candidate and accept or reject application.
        </Typography>
      </Stack>
      <Stack direction="row" gap={4} alignItems="center">
        <Avatar src={application.user.photo} width={80} alt="Profile Photo" />
        <Stack gap={1} sx={{ flexGrow: 1 }}>
          <Typography variant="headlinesm" className="text-ellipsis">
            {application.position.title}
          </Typography>
          <Typography
            variant="titlemd"
            className="text-ellipsis"
            color="var(--text-subtitle)">
            {application.position.type === "internship"
              ? "Internship"
              : "Full-time job"}
          </Typography>
        </Stack>
        <Chip
          label={STATUS_TEXT(application.status).text}
          variant="filled"
          color={STATUS_TEXT(application.status).color}
        />
      </Stack>
      <Stack direction={{ md: "row" }} gap={3}>
        <Typography
          variant="titlelg"
          color="var(--text-title)"
          sx={{
            flexBasis: { md: "15rem" },
          }}>
          Personal Information
        </Typography>
        <Stack gap={2} sx={{ flex: 1 }}>
          <Typography variant="labellg">
            Full name:
            <span style={{ color: "var(--text-subtitle)", marginLeft: "1rem" }}>
              {application.personalInformation.fullName}
            </span>
          </Typography>
          <Typography variant="labellg">
            Email Address:
            <a
              target="_blank"
              href={`mailto:${application.personalInformation.email}`}
              style={{ color: "var(--text-subtitle)", marginLeft: "1rem" }}>
              {application.personalInformation.email}
            </a>
          </Typography>
          <Typography variant="labellg">
            Gender:
            <span
              style={{
                color: "var(--text-subtitle)",
                marginLeft: "1rem",
                textTransform: "capitalize",
              }}>
              {application.personalInformation.gender}
            </span>
          </Typography>
          {application.personalInformation.linkedin && (
            <Typography variant="labellg">
              Linkedin:
              <a
                target="_blank"
                href={
                  /^[A-z0-9_-]+$/.test(application.personalInformation.linkedin)
                    ? `https://www.linkedin.com/in/${application.personalInformation.linkedin}`
                    : application.personalInformation.linkedin
                }
                style={{ color: "var(--text-primary)", marginLeft: "1rem" }}>
                @{application.personalInformation.linkedin}
              </a>
            </Typography>
          )}
          {application.github && (
            <Typography variant="labellg">
              GitHub:
              <a
                target="_blank"
                href={`https://www.github.com/${application.github}`}
                style={{ color: "var(--text-primary)", marginLeft: "1rem" }}>
                @{application.github}
              </a>
            </Typography>
          )}
          {application.personalInformation.website && (
            <Typography variant="labellg">
              Website:
              <a
                target="_blank"
                href={application.personalInformation.website}
                style={{ color: "var(--text-primary)", marginLeft: "1rem" }}>
                {application.personalInformation.website}
              </a>
            </Typography>
          )}
          <Typography variant="labellg" sx={{ display: "flex" }}>
            Country:
            <span
              style={{
                color: "var(--text-subtitle)",
                marginLeft: "1rem",
                display: "flex",
                gap: "0.5rem",
              }}>
              {country && (
                <Avatar src={country.flag} width={21} alt="Country Flag" />
              )}
              {country?.name}
            </span>
          </Typography>
          <Typography variant="labellg">
            Phone:
            <a
              target="_blank"
              href={`tel:${application.personalInformation.phone}`}
              style={{ color: "var(--text-subtitle)", marginLeft: "1rem" }}>
              {phoneCountry?.idd}
              {application.personalInformation.phone.replace(
                phoneCountry?.idd ?? "",
                ""
              )}
            </a>
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={{ md: "row" }} gap={3}>
        <Typography
          variant="titlelg"
          color="var(--text-title)"
          sx={{
            flexBasis: { md: "15rem" },
          }}>
          Education background
        </Typography>
        <Stack gap={2} sx={{ flex: 1 }}>
          {application.educationBackground.map((e, i) => (
            <Stack
              key={`education:${i}`}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={1}>
              <Stack sx={{ whiteSpace: "nowrap", width: "100%" }}>
                <Typography variant="titlelg" className="text-ellipsis">
                  {e.school}
                </Typography>
                <Typography variant="labellg" className="text-ellipsis">
                  {e.course}
                </Typography>
                <Typography
                  variant="labelmd"
                  className="text-ellipsis"
                  color="var(--text-subtitle)">
                  {e.from} - {e.to}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
      {!!application.workExperience.length && (
        <Stack direction={{ md: "row" }} gap={3}>
          <Typography
            variant="titlelg"
            color="var(--text-title)"
            sx={{
              flexBasis: { md: "15rem" },
            }}>
            Work Experience
          </Typography>
          <Stack gap={2} sx={{ flex: 1 }}>
            {application.workExperience.map((e, i) => (
              <Stack
                key={`education:${i}`}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={1}>
                <Stack sx={{ whiteSpace: "nowrap", width: "100%" }}>
                  <Typography variant="titlelg" className="text-ellipsis">
                    {e.company}
                  </Typography>
                  <Typography variant="labellg" className="text-ellipsis">
                    {e.role}
                  </Typography>
                  <Typography
                    variant="labelmd"
                    className="text-ellipsis"
                    color="var(--text-subtitle)">
                    {e.from} - {e.to}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
      <Stack direction={{ md: "row" }} gap={3}>
        <Typography
          variant="titlelg"
          color="var(--text-title)"
          sx={{
            flexBasis: { md: "15rem" },
          }}>
          Resume
        </Typography>
        <Button
          variant="outlined"
          startIcon={<FontAwesomeIcon icon={faFile} />}
          component="a"
          href={application.resume ?? ""}
          target="_blank">
          Resume
        </Button>
      </Stack>
      <Stack direction={{ md: "row" }} gap={3}>
        <Typography
          variant="titlelg"
          color="var(--text-title)"
          sx={{
            flexBasis: { md: "15rem" },
          }}>
          Self Rating
        </Typography>
        <Stack gap={2} sx={{ flex: 1 }}>
          {TECHNOLOGIES.map((tech) => (
            <RatingInput
              key={tech.key}
              tech={tech}
              tooltip={false}
              onSelected={(value) => {
                if (value === 0) {
                  setAdminRatings(
                    adminRatings.filter((s) => s.name !== tech.key)
                  );
                } else {
                  setAdminRatings([
                    ...adminRatings.filter((s) => s.name !== tech.key),
                    { name: tech.key, level: value },
                  ]);
                }
              }}
              defaultValue={
                adminRatings.find((s) => s.name === tech.key)?.level ??
                application.skills.find((s) => s.name === tech.key)?.level
              }
            />
          ))}
        </Stack>
      </Stack>

      {answeredTasks.length > 0 && (
        <Stack direction={{ md: "row" }} gap={3}>
          <Typography
            variant="titlelg"
            color="var(--text-title)"
            sx={{
              flexBasis: { md: "15rem" },
            }}>
            Developer Test
          </Typography>
          <Stack gap={3} sx={{ flex: 1 }}>
            {answeredTasks.map((item, i) => (
              <Stack
                key={i}
                gap={3}
                justifyContent={"space-between"}
                sx={{
                  flexDirection: { sm: 'row', xs: "column" },
                  alignItems: { sm: "center", xs: 'left' }
                }}
              >
                <Stack gap={1}>
                  <Typography variant='headlinesm' color="var(--black)">
                    Task {i + 1} ({item?.task?.title})
                  </Typography>
                  <Typography
                    variant='titlemd'
                    color="var(--text-subtitle)"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    Question Type: {item?.task?.questionType}
                  </Typography>
                </Stack>
                <Stack sx={{ width: { sm: 'auto', xs: '100%' } }}>
                  <Button variant="outlined" onClick={() => setViewTest(item)}>
                    View
                  </Button>
                </Stack>
              </Stack>
            ))}

          </Stack>
        </Stack>
      )}

      <Stack direction={{ md: "row" }} gap={3}>
        <Typography
          variant="titlelg"
          color="var(--text-title)"
          sx={{
            flexBasis: { md: "15rem" },
          }}>
          Interview
        </Typography>
        {(!application.interviewed || editInterviewNote) ?
          <Stack gap={2} sx={{ flex: 1 }}>
            <TextField
              label="Interview Notes"
              multiline
              rows={5}
              value={interviewNotes}
              onChange={(e) => setInterviewNotes(e.target.value)}
            />
            <LoadingButton
              loading={interviewing}
              variant="contained"
              size="large"
              onClick={interview}>
              Save notes & Mark as Interviewed
            </LoadingButton>
          </Stack> :
          <Stack
            gap={3}
            justifyContent={"space-between"}
            sx={{
              flex: 1,
              flexDirection: { sm: 'row', xs: "column" },
              alignItems: { sm: "flex-start", xs: 'left' }
            }}
          >
            <Stack gap={1}>
              <Typography variant="labellg" className="line-clamp">
                {application.interviewNotes}
              </Typography>
            </Stack>
            <Stack sx={{ width: { sm: 'auto', xs: '100%' } }}>
              <Button
                variant="outlined"
                startIcon={<FontAwesomeIcon icon={faEdit} />}
                onClick={() => setEditInterviewNote(true)}
              >
                Edit Note
              </Button>
            </Stack>
          </Stack>}
      </Stack>
      <Stack direction={{ md: "row" }} gap={3}>
        <Typography
          variant="titlelg"
          color="var(--text-title)"
          sx={{
            flexBasis: { md: "15rem" },
          }}>
          Admin Rating
        </Typography>
        <Stack gap={{ xs: 3, sm: 4 }} sx={{ flex: 1 }}>
          {TECHNICAL_SKILLS.map((tech) => (
            <RatingInput
              key={tech.key}
              tech={tech}
              tooltip={false}
              defaultValue={
                adminRatings.find((s) => s.name === tech.key)?.level
              }
              onSelected={(value) => {
                if (value === 0) {
                  setAdminRatings(
                    adminRatings.filter((s) => s.name !== tech.key)
                  );
                } else {
                  setAdminRatings([
                    ...adminRatings.filter((s) => s.name !== tech.key),
                    { name: tech.key, level: value },
                  ]);
                }
              }}
            />
          ))}
        </Stack>
      </Stack>

      {application.status !== "hired" &&
        <Stack direction={{ md: "row" }} sx={{ marginTop: 4 }} gap={3}>
          <Typography
            variant="titlelg"
            color="var(--text-title)"
            sx={{
              flexBasis: { md: "15rem" },
            }}>
            Review
          </Typography>
          <Stack
            gap={2}
            direction="row"
            sx={{ width: "100%", maxWidth: "30rem" }}>
            {application.status !== "accepted" &&
              <LoadingButton
                disabled={submitting.loading}
                variant="contained"
                size="large"
                color="success"
                onClick={() => setOpenContract(true)}
                // onClick={() => submit("accepted")}
                sx={{ flex: 1 }}>
                Accept
              </LoadingButton>
            }
            <LoadingButton
              loading={submitting.loading && submitting.status === 'rejected'}
              disabled={submitting.status === 'accepted'}
              variant="contained"
              size="large"
              color="error"
              onClick={() => submit("rejected")}
              sx={{ flex: 1 }}>
              Reject
            </LoadingButton>
          </Stack>
        </Stack>
      }

      {application.signedContract &&
        <Stack direction={{ md: "row" }} gap={3}>
          <Typography
            variant="titlelg"
            color="var(--text-title)"
            sx={{
              flexBasis: { md: "15rem" },
            }}>
            Signed Contract
          </Typography>
          <Stack direction={"row"} sx={{ justifyContent: "space-between", flex: 1 }}>
            <Button
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faDownload} />}
              component="a"
              href={application.signedContract ?? ""}
              target="_blank">
              Download
            </Button>
            {application.status !== "hired" &&
              <Stack direction={"row"} gap={1}>
                <LoadingButton
                  loading={updateContract.loading && updateContract.status === 'accepted'}
                  disabled={updateContract.loading}
                  variant="contained"
                  color="success"
                  onClick={() => updateContractStatus("accepted")}
                >
                  Accept
                </LoadingButton>
                <LoadingButton
                  loading={updateContract.loading && updateContract.status === 'reSubmit'}
                  disabled={updateContract.loading || application.contractStatus === 'reSubmit'}
                  variant="contained"
                  color="error"
                  onClick={() => updateContractStatus("reSubmit")}
                >
                  Resubmit
                </LoadingButton>
              </Stack>
            }
          </Stack>
        </Stack>
      }

      <TestViewModel data={viewTest} onClose={() => setViewTest(null)} />

      <ContractModel
        open={openContract}
        onClose={handleCloseContractModel}
        handleChange={handleChangeFile}
        data={contractDocument}
        loading={submitting.loading && submitting.status === 'accepted'}
        onSubmit={() => submit("accepted")}
      />
    </Stack>
  );
};

export default ApplicationReview;
