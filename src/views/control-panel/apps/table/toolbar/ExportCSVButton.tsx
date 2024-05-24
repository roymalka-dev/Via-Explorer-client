import React from "react";
import CSVExporter from "@/components/shared/common/csv/CSVExporter";
import { appType } from "@/types/app.types";

interface ExportCSVProps {
  rows: appType[];
}

const ExportCSVButton: React.FC<ExportCSVProps> = ({ rows }) => {
  return <CSVExporter jsonData={rows} />;
};

export default ExportCSVButton;
