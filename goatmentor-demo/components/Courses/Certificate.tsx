"use client";
import { api } from "@/axios";
import { CourseDetails } from "@/prisma/constants";
import { RootState } from "@/store";
import { COURSE_DURATION } from "@/utils/constants";
import firebaseUpload from "@/utils/firebaseUpload";
import { useToast } from "@/utils/toast";
import { faFileCertificate } from "@fortawesome/pro-regular-svg-icons";
import { faCopy } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/material";
import ReactPDF, {
  Document,
  Font,
  Image,
  Line,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Svg,
  Text,
} from "@react-pdf/renderer";
import { getStorage, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoadingButton from "../Common/LoadingButton";

Font.register({
  family: "Raleway",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCP.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvoooCP.ttf",
      fontWeight: "medium",
    },
    {
      src: "https://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pYCP.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtzpYCP.ttf",
      fontWeight: "heavy",
    },
  ],
});

Font.register({
  family: "Dancing Script",
  src: "https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSoHTQ.ttf",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Raleway",
    padding: "75px 75px 0 75px",
    gap: "15px",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  pageBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

interface CertificateProps {
  name: string;
  course: string;
  duration: number;
}

export const CourseCertificate = ({
  name,
  course,
  duration,
}: CertificateProps) => {
  return (
    <Document>
      <Page size="A4" orientation="portrait" style={styles.page}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          src={"/images/courses/certificate_bg.png"}
          style={styles.pageBackground}
        />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          src={"/logo.png"}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "contain",
            alignSelf: "flex-end",
          }}
        />
        <Text
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#f7913d",
            textAlign: "center",
            marginTop: "45px",
          }}>
          CERTIFICATE
        </Text>
        <Text
          style={{
            fontSize: "28px",
            fontWeight: "normal",
            color: "#4d4848",
            textAlign: "center",
          }}>
          Of Completion
        </Text>
        <Text
          style={{
            fontSize: "16px",
            fontWeight: "medium",
            color: "#212121",
            textAlign: "center",
            marginTop: "30px",
          }}>
          This certificate is presented to:
        </Text>
        <Text
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#f7913d",
            textAlign: "center",
            marginTop: "10px",
            fontFamily: "Dancing Script",
          }}>
          {name}
        </Text>
        <Svg height="5" width="450">
          <Line
            x1="0"
            y1="2"
            x2="495"
            y2="2"
            strokeWidth={2}
            stroke="#969696"
          />
        </Svg>
        <Text
          style={{
            fontSize: "16px",
            fontWeight: "normal",
            color: "#212121",
            textAlign: "center",
            marginTop: "30px",
          }}>
          to certify that they have successfully completed a total of{" "}
          {COURSE_DURATION(duration, true)} in the following course provided by
          GoatMentor.
        </Text>
        <Text
          style={{
            fontSize: "18px",
            fontWeight: "medium",
            color: "#4d4848",
            textAlign: "center",
          }}>
          &quot;{course}&quot;
        </Text>
        <Text
          style={{
            fontSize: "14px",
            fontWeight: "normal",
            color: "#616161",
            textAlign: "center",
            position: "absolute",
            bottom: "75px",
            left: "0",
            right: "0",
          }}>
          &copy; Copyright {new Date().getFullYear()} Goatmentor
        </Text>
      </Page>
    </Document>
  );
};

interface Props {
  completed: boolean;
  course: CourseDetails;
}

const CertificateButton = ({ completed, course }: Props) => {
  const totalDuration = course.chapters.reduce(
    (acc, curr) => acc + curr.lessons.reduce((a, b) => a + b.duration, 0),
    0
  );

  const [uploading, setUploading] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const { showToast } = useToast();
  const router = useRouter();

  const copyLink = async () => {
    let url;
    const enrollment = course.enrollments?.find((e) => true);
    if (!enrollment?.certificate) {
      setUploading(true);
      const blob = await ReactPDF.pdf(
        <CourseCertificate
          name={user.fullName}
          course={course.title}
          duration={totalDuration}
        />
      ).toBlob();
      const storage = getStorage();
      const certificate = ref(
        storage,
        `certificates/${course.uid}/${user.uid}.pdf`
      );
      url = await firebaseUpload(certificate, blob);
      api
        .patch(`/api/courses/${course.uid}/enroll`, {
          certificate: url,
        })
        .then((e) => {
          router.refresh();
        })
        .catch((e) => console.log(e));
      setUploading(false);
    } else {
      url = enrollment.certificate;
    }
    navigator.clipboard.writeText(url);
    showToast("success", "Certificate link copied to clipboard");
  };

  const DownloadButton = () => (
    <LoadingButton
      variant="outlined"
      size="large"
      disabled={!completed}
      startIcon={<FontAwesomeIcon icon={faFileCertificate} />}>
      Download Certificate Now
    </LoadingButton>
  );

  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      {completed ? (
        <PDFDownloadLink
          document={
            <CourseCertificate
              name={user.fullName}
              course={course.title}
              duration={totalDuration}
            />
          }
          fileName={`${course.title}.pdf`}>
          <DownloadButton />
        </PDFDownloadLink>
      ) : (
        <DownloadButton />
      )}
      <LoadingButton
        variant="outlined"
        size="large"
        disabled={!completed}
        loading={uploading}
        onClick={copyLink}
        startIcon={<FontAwesomeIcon icon={faCopy} />}>
        Copy Link
      </LoadingButton>
    </Stack>
  );
};

export default CertificateButton;
