"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import TemplateEditor from "./TemplateEditor";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Pageheader from "@/components/PageHeader";
import {
  useCreateEmailTemplate,
  useEmailTemplatesListing,
  useMergeTagsListing,
  useUpdateEmailTemplate,
} from "@/provider/EmailTemplates";
import { convertToTitleCase, EmailNameEnum, toCamelCase } from "./constants";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomCard from "@/components/Card";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";

const CustomTemplates = () => {
  const emailEditorRef = useRef<EditorRef>(null);
  const { data: emailTemplates, isLoading: emailTemplatesLoading } =
    useEmailTemplatesListing({ limit: 1000 });
  const createEmailTemplate = useCreateEmailTemplate({});
  const updateEmailTemplate = useUpdateEmailTemplate({});
  const [templateId, setTemplateId] = useState<string>("");
  const [isEditorReady, setisEditorReady] = useState<boolean>(false);
  const [templateName, setTemplateName] = useState<string>("");
  const [templateJson, setTemplateJson] = useState<any>({});
  const [templateSubject, setTemplateSubject] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const tags = useMergeTagsListing({ emailName: templateName });

  const columns: GridColDef[] = [
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EditIcon
            sx={{ color: "#4b8ad1", cursor: "pointer" }}
            onClick={() => editTemplate(params.row)}
          />
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Template Name",
      flex: 1,
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created on",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        moment(params.row?.createdAt).format("MM-DD-YYYY") || "-",
    },
  ];

  const mergeTags = useMemo(() => {
    return tags.data?.reduce((acc: any, key: string) => {
      const camelCaseKey = toCamelCase(key);
      acc[camelCaseKey] = {
        name: convertToTitleCase(key),
        value: `{{${key}}}`,
        sample: camelCaseKey,
      };
      return acc;
    }, {});
  }, [tags.data]);

  const SaveDesign = () => {
    if (templateName && templateSubject) {
      const unlayer = emailEditorRef.current?.editor;
      unlayer?.exportHtml((data) => {
        const { design, html } = data;
        if (templateId) {
          updateEmailTemplate
            .mutateAsync({
              id: templateId,
              html: html,
              name: templateName,
              subject: templateSubject,
              json: JSON.stringify(design),
            })
            .then((res) => {
              cancelEditTemplate();
              toast.success("Template updated successfully");
            });
        } else {
          createEmailTemplate
            .mutateAsync({
              html: html,
              name: templateName,
              subject: templateSubject,
              json: JSON.stringify(design),
            })
            .then((res) => {
              cancelEditTemplate();
              toast.success("Template created successfully");
            });
        }
      });
    } else {
      toast.error("Please fill template name and subject to save");
    }
  };
  const onLoad = () => {
    setisEditorReady(false);
  };
  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)
    // const templateJson = { DESIGN JSON GOES HERE };
    unlayer.loadDesign(templateJson);
    setisEditorReady(true);
  };

  const editTemplate = (template: any) => {
    setTemplateId(template.id);
    setTemplateJson(JSON.parse(template.json));
    setTemplateName(template.name);
    setTemplateSubject(template.subject);
    setIsEditing(!isEditing);
  };
  const cancelEditTemplate = () => {
    setTemplateId("");
    setTemplateJson({});
    setTemplateName("");
    setTemplateSubject("");
    setIsEditing(!isEditing);
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pageheader title="Email Templates" />
        {!isEditing && (
          <Button variant="contained" onClick={() => setIsEditing(!isEditing)}>
            Create New template
          </Button>
        )}
      </Box>
      {!isEditing ? (
        <>
          <CustomCard>
            <DataGrid
              rowSelection={false}
              rows={emailTemplates?.data || []}
              columns={columns}
              getRowId={(row) => row.id}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0
                  ? "Mui-even"
                  : "Mui-odd"
              }
              density="compact"
              // columnVisibilityModel={columnVisibilityModel}
              slots={{
                toolbar: GridToolbar,
              }}
              loading={emailTemplatesLoading}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          </CustomCard>
        </>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
              width: { sm: "100%", md: "50%" },
            }}
          >
            <CustomTextField
              label={"Template Name"}
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              size="small"
              disabled={templateId ? true : false}
              select
            >
              {Object.keys(EmailNameEnum).map((key, i) => (
                <MenuItem
                  key={i}
                  value={EmailNameEnum[key as keyof typeof EmailNameEnum]}
                >
                  {EmailNameEnum[key as keyof typeof EmailNameEnum]}
                </MenuItem>
              ))}
            </CustomTextField>
            <CustomTextField
              value={templateSubject}
              onChange={(e) => setTemplateSubject(e.target.value)}
              {...renderFieldProps()}
              label="Subject"
              type="subject"
              name="subject"
            />
          </Box>
          <TemplateEditor
            isEditorReady={isEditorReady}
            mergeTags={mergeTags}
            onLoad={onLoad}
            emailEditorRef={emailEditorRef}
            onReady={onReady}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              my: 2,
              justifyContent: "end",
            }}
          >
            <Button
              onClick={cancelEditTemplate}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button onClick={SaveDesign} variant="contained">
              {emailTemplatesLoading || updateEmailTemplate?.isLoading ? (
                <CircularProgress size={20} sx={{ color: "#ffff" }} />
              ) : (
                "Save"
              )}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CustomTemplates;
