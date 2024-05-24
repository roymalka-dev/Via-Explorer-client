import { appType } from "@/types/app.types";
import { TabConfig } from "@/types/form.types";
import { RequestEditAppType } from "@/types/request.types";
import { useMemo } from "react";
import * as yup from "yup";

const useEditAppFormTabs = (
  selectedEditApp: appType | null
): TabConfig<RequestEditAppType>[] => {
  const editAppFormTabs: TabConfig<RequestEditAppType>[] = useMemo(() => {
    return [
      {
        tabName: "",
        fields: [
          {
            name: "name",
            label: "Name",
            type: "text",
            initialValue: selectedEditApp?.name || "",
            validation: yup.string().optional(),
          },
          {
            name: "env",
            label: "Env",
            type: "text",
            initialValue: selectedEditApp?.env || "",
            validation: yup.string().optional(),
          },
          {
            name: "tenant",
            label: "Tenant",
            type: "text",
            initialValue: selectedEditApp?.tenant || "",
            validation: yup.string().optional(),
          },
          {
            name: "region",
            label: "Region",
            type: "text",
            initialValue: selectedEditApp?.region || "",
            validation: yup.string().optional(),
          },
          {
            name: "city",
            label: "City",
            type: "text",
            initialValue: selectedEditApp?.city || "",
            validation: yup.string().optional(),
          },
          {
            name: "country",
            label: "Country",
            type: "text",
            initialValue: selectedEditApp?.country || "",
            validation: yup.string().optional(),
          },
          {
            name: "iosFolder",
            label: "iOS Folder",
            type: "text",
            initialValue: selectedEditApp?.iosFolder || "",
            validation: yup.string().optional(),
          },
          {
            name: "androidFolder",
            label: "Android Folder",
            type: "text",
            initialValue: selectedEditApp?.androidFolder || "",
            validation: yup.string().optional(),
          },
          {
            name: "colorSpecs",
            label: "Color Specs",
            type: "text",
            initialValue: selectedEditApp?.colorSpecs || "",
            validation: yup.string().optional(),
          },
          {
            name: "figmaAppName",
            label: "Figma App Name",
            type: "text",
            initialValue: selectedEditApp?.figmaAppName || "",
            validation: yup.string().optional(),
          },
          {
            name: "webAppFigmaLink",
            label: "Web App Figma Link",
            type: "text",
            initialValue: selectedEditApp?.webAppFigmaLink || "",
            validation: yup.string().url("Must be a valid URL").optional(),
          },
          {
            name: "webAppLink",
            label: "Web App Link",
            type: "text",
            initialValue: selectedEditApp?.webAppLink || "",
            validation: yup.string().url("Must be a valid URL").optional(),
          },
        ],
      },
    ];
  }, [selectedEditApp]);

  return editAppFormTabs;
};

export default useEditAppFormTabs;
