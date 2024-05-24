import { TabConfig } from "@/types/form.types";
import { RequestEditAppType } from "@/types/request.types";
import { useMemo } from "react";
import * as yup from "yup";

const useAddNewAppFormTabs = (): TabConfig<RequestEditAppType>[] => {
  const addAppFormTabs: TabConfig<RequestEditAppType>[] = useMemo(() => {
    return [
      {
        tabName: "Basic Info",
        fields: [
          {
            name: "id",
            label: "Via ID",
            type: "number",
            initialValue: "",
            validation: yup.number().required("Id is required"),
            information: "This is the ID of the app in the database",
          },
          {
            name: "iosAppId",
            label: "iOS store App ID",
            type: "text",
            initialValue: "",
            validation: yup.string().required("iOS App ID is required"),
            information: "This is the ID of the app in the iOS store",
          },
          {
            name: "androidAppId",
            label: "Android store App ID",
            type: "text",
            initialValue: "",
            validation: yup.string().required("Android App ID is required"),
            information: "This is the ID of the app in the Android store",
          },
          {
            name: "name",
            label: "Name",
            type: "text",
            initialValue: "",
            validation: yup.string().required("Name is required"),
          },
          {
            name: "env",
            label: "Environment",
            type: "text",
            initialValue: "",
            validation: yup.string().required("Environment is required"),
          },
          {
            name: "tenant",
            label: "Tenant",
            type: "text",
            initialValue: "",
            validation: yup.string().required("Tenant is required"),
          },
          {
            name: "city",
            label: "City",
            type: "text",
            initialValue: "",
            validation: yup.string().required("City name is required"),
          },
          {
            name: "country",
            label: "Country",
            type: "text",
            initialValue: "",
            validation: yup.string().required("Country is required"),
          },
          {
            name: "region",
            label: "Region",
            type: "select",
            options: ["us1", "eu1", "ap1", "ap2"],
            initialValue: "",
            validation: yup.string().required("Region is required"),
          },
        ],
      },
      {
        tabName: "Platform Details",
        fields: [
          {
            name: "iosFolder",
            label: "iOS Folder",
            type: "text",
            initialValue: "",
            validation: yup.string().optional(),
          },
          {
            name: "androidFolder",
            label: "Android Folder",
            type: "text",
            initialValue: "",
            validation: yup.string().optional(),
          },
          {
            name: "webAppLink",
            label: "Web App Link",
            type: "text",
            initialValue: "",
            validation: yup.string().url("Must be a valid URL").optional(),
          },
          {
            name: "pso",
            label: "PSO",
            type: "text",
            initialValue: "",
            validation: yup.string(),
          },
          {
            name: "psm",
            label: "PSM",
            type: "text",
            initialValue: "",
            validation: yup.string(),
          },
        ],
      },
      {
        tabName: "Design & Access",
        fields: [
          {
            name: "colorSpecs",
            label: "Color Specifications",
            type: "text",
            initialValue: "",
            validation: yup.string().optional(),
          },
          {
            name: "figmaAppName",
            label: "Figma App Name",
            type: "text",
            initialValue: "",
            validation: yup.string().optional(),
          },
          {
            name: "webAppFigmaLink",
            label: "Web App Figma Link",
            type: "text",
            initialValue: "",
            validation: yup.string().url("Must be a valid URL").optional(),
          },
        ],
      },
    ];
  }, []);

  return addAppFormTabs;
};

export default useAddNewAppFormTabs;
