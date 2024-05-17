/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

/**
 * Component Props
 * @typedef {Object} CSVExportProps
 * @property {any[]} jsonData - JSON data to export
 */
interface CSVExportProps {
  jsonData: any[]; // JSON data to export
}

/**
 * CSV Exporter component that converts JSON data to CSV format and allows users
 * to download the generated CSV file.
 * @param {CSVExportProps} props - Component props
 * @returns {JSX.Element} CSVExporter component
 */
const CSVExporter: React.FC<CSVExportProps> = ({ jsonData }) => {
  /**
   * Converts JSON data to CSV format.
   * @param {any[]} data - JSON data to convert
   * @returns {string} CSV formatted string
   */
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

  /**
   * Downloads the generated CSV file.
   */
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
    <Button onClick={downloadCSV}>
      <FileDownloadIcon />
    </Button>
  );
};

export default CSVExporter;
