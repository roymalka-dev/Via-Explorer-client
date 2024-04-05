import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import {
  Box,
  Typography,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import InformationTooltip from "../tools/InformationTooltip";
import ImageExampleTooltip from "../tools/ImageExampleToolTip";
import axios from "axios";
import ApiService from "@/services/ApiService";

interface DragDropFileInputProps {
  name: string;
  label?: string;
  information?: string;
  imageExample?: string;
  bucketName?: string;
}

const DragDropFileInput: React.FC<DragDropFileInputProps> = ({
  name,
  label,
  information,
  imageExample,
  bucketName,
}) => {
  const theme = useTheme();
  const { setFieldValue } = useFormikContext();
  const [, meta] = useField(name);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [hashedFile, setHashedFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const isError = Boolean(meta.touched && meta.error);

  const handleUploadToS3 = async (file: File) => {
    setUploading(true);
    try {
      const response = await ApiService.post("requests/get-s3-presigned-url", {
        bucketName: bucketName,
        fileName: file.name,
        fileType: file.type,
      });
      const { presignedUrl, fileUrl, hashedFileName } = response.data;
      setHashedFile(hashedFileName);
      if (!presignedUrl) {
        throw new Error("Presigned URL is undefined or invalid.");
      }

      // Upload the file to S3
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // Update Formik field with the S3 file URL
      setFieldValue(name, fileUrl);
      setSelectedFileName(file.name);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error (e.g., set Formik field error)
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFromS3 = async () => {
    setUploading(true);
    try {
      await ApiService.delete(
        `requests/remove-s3-object/${bucketName}/${hashedFile}`
      );
      setUploading(false);
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  const handleFileChange = async (file: File | null) => {
    if (file) {
      await handleUploadToS3(file);
    } else {
      setSelectedFileName(null); // Clear selected file name
      setFieldValue(name, null); // Reset Formik field value
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFileChange(file);
  };

  const handleRemove = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await handleRemoveFromS3();
    handleFileChange(null);
  };

  return (
    <Box>
      {label && (
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <Typography variant="h6">{label}</Typography>
          {information && <InformationTooltip information={information} />}
          {imageExample && <ImageExampleTooltip imageUrl={imageExample} />}
        </Box>
      )}
      <Box
        sx={{
          border: `2px dashed ${theme.palette.primary.main}`,
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragging
            ? theme.palette.secondary.light
            : isError
            ? theme.palette.error.light
            : theme.palette.action.hover,
          marginBottom: "5px",
          "&:hover": {
            backgroundColor: theme.palette.grey[200],
          },
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`fileInput-${name}`)?.click()}
      >
        {uploading ? (
          <CircularProgress />
        ) : selectedFileName ? (
          <>
            <Typography sx={{ mt: 2 }}>{selectedFileName}</Typography>
            <Button
              startIcon={<ClearIcon />}
              onClick={(e) => handleRemove(e)}
              sx={{ mt: 1 }}
            >
              Remove
            </Button>
          </>
        ) : (
          <Typography>
            Drag and drop a file here, or click to select a file
          </Typography>
        )}
        <input
          id={`fileInput-${name}`}
          name={name}
          type="file"
          onChange={(e) => handleChange(e)}
          style={{ display: "none" }}
        />
      </Box>

      {isError && (
        <Typography color="error" variant="body2">
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};

export default DragDropFileInput;
