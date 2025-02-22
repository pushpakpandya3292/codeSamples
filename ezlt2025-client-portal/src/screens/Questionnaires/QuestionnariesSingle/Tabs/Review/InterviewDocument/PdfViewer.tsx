"use client";
import { useCallback, useEffect, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./Sample.css";

import type { PDFDocumentProxy } from "pdfjs-dist";

import {
  Box,
  Button,
  Typography,
  Zoom,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CustomModal from "@/components/CustomModal";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { useCreateDocument } from "@/provider/DocumentBuilder";
import { useFormContext } from "react-hook-form";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;
interface PdfViewerProps {
  createDocument: any;
  handleStepChange: () => void;
}
export default function PdfViewer({
  handleStepChange,
  createDocument,
}: PdfViewerProps) {
  const { watch } = useFormContext();
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);

  let modalInterval = setInterval(() => {}, 0);
  useEffect(() => {
    return () => {
      setShowModal(false);
      clearInterval(modalInterval);
    };
  }, []);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
    ShowModalTimer();
  }

  function ShowModalTimer() {
    clearInterval(modalInterval);
    setTimeout(() => {
      setShowModal(true);
    }, 5000);
    modalInterval = setInterval(() => {
      setShowModal(true);
    }, 60000);
  }

  return (
    <>
      <CustomModal width={{ xs: "100%", sm: "450px" }} open={showModal} handleClose={() => {}}>
        <Typography variant="h3" sx={{}}>
          Do you want to continue reading or proceed to checkout?
        </Typography>
        <Zoom
          in={showModal}
          mountOnEnter
          unmountOnExit
          style={{ transitionDelay: showModal ? "500ms" : "0ms" }}
        >
          <Box
            sx={{
              flexDirection: {xs:"column", sm:"row"},
              display: "flex",
              gap: {xs: 2, sm: 1},
              justifyContent: "space-between",
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
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
              onClick={handleStepChange}
            >
              Proceed to Checkout
              <ArrowRightAltOutlined sx={{ ml: 1, fontSize: "25px" }} />
            </Button>
          </Box>
        </Zoom>
      </CustomModal>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="Example__container__document" ref={setContainerRef}>
          {createDocument?.isFetching ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <img src={"/images/document.gif"} />
              <Typography sx={{ mt: 1, fontSize: "18px" }}>
                Please wait while we generate your document
              </Typography>
            </Box>
          ) : (
            <Document
              renderMode="canvas"
              file={createDocument?.data?.pdfFile?.path}
              loading={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 4,
                  }}
                >
                  <img src={"/images/document.gif"} />
                  <Typography sx={{ mt: 1, fontSize: "18px" }}>
                    Please wait while we generate your document
                  </Typography>
                </Box>
              }
              className="pdf-container"
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
              onContextMenu={(e) => e.preventDefault()}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={
                    containerWidth
                      ? Math.min(containerWidth, maxWidth)
                      : maxWidth
                  }
                />
              ))}
            </Document>
          )}
        </div>
      </Box>
    </>
  );
}
