/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
interface CSVExportProps {
  jsonData: any[]; // JSON data to export
}

const CSVExporter: React.FC<CSVExportProps> = ({ jsonData }) => {
  const convertToCSV = (data: any[]) => {
    const csv = data
      .map((row) => {
        if (Array.isArray(row)) {
          return row
            .map((value) => {
              return typeof value === "number" ? value : `"${value}"`;
            })
            .join(",");
        } else if (typeof row === "object") {
          return Object.values(row)
            .map((value) => {
              return typeof value === "number" ? value : `"${value}"`;
            })
            .join(",");
        } else {
          return String(row);
        }
      })
      .join("\n");

    return "data:text/csv;charset=utf-8," + encodeURI(csv);
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(jsonData);
    const link = document.createElement("a");
    link.href = csvData;
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outlined" onClick={downloadCSV}>
      <FileDownloadIcon />
    </Button>
  );
};

export default CSVExporter;
