import { TabConfig } from "@/types/form.types";
import { AppRequestType } from "@/types/request.types";
import * as yup from "yup";

export const requestAppTabs: TabConfig<AppRequestType>[] = [
  // First step
  {
    tabName: "General Info",
    fields: [
      {
        name: "riderAppName",
        label: "Rider App Name",
        type: "text",
        initialValue: "",
        validation: yup
          .string()
          .required("App Name is required")
          .min(3, "App Name must be at least 3 characters"),
        information:
          "We suggest using a rider app name with a limit of 10-11 characters.",
      },
      {
        name: "riderAppShortName",
        label: "Rider App Short Name",
        type: "text",
        initialValue: "",
        validation: yup
          .string()
          .required("App Short Name is required")
          .max(20, "App Short Name cannot exceed 20 characters"),
        information:
          "If the rider app name exceeds 10-11 characters, please provide a shortened name (maximum 10-11 characters) to appear below the Launcher icon (the app icon on the device desktop/home screen). If not, use the Rider app name from the previous field.",
        imageExample:
          "https://lh7-us.googleusercontent.com/TnIC1bWi1llg0xqgXI0jTe-LIncftABhkeyJbWb6NbYVuNOarQrvNpqXUjJBlWsYK2JdDWCkRd2vBQBK6l6TeufyC3ujPOXbhJ1k6lxVAcqXLExpUo0d4OJByVbb9Se2qnEuBxE3qAdAiSS4RoZMAowRzk-SLA",
      },
      {
        name: "launchDate",
        label: "Launch Date",
        type: "date",
        initialValue: new Date().toLocaleDateString("en-CA"),
        validation: yup
          .date()
          .required("Launch Date is required")
          .min(new Date(), "Launch Date cannot be in the past"),
      },
      {
        name: "jiraProjectLink",
        label: "Jira Project Link",
        type: "text",
        initialValue: "",
        validation: yup.string().url("Must be a valid URL"),
        information: "Please provide the Jira project link for the service.",
      },
      {
        name: "externalLinks",
        label: "External Links",
        type: "multi-input",
        initialValue: [""],
        validation: yup.array().of(yup.string().url("Must be a valid URL")),
      },
      {
        name: "serviceType",
        label: "Service Type",
        type: "select",
        initialValue: "",
        validation: yup.string().required("Service Type is required"),
        options: ["On Demand", "Prebooking"],
      },
      {
        name: "servicePaymentType",
        label: "Service Payment Type",
        type: "select",
        initialValue: "",
        validation: yup.string().required("Service Payment Type is required"),
        options: ["Free", "Paid with ride credit", "Paid without ride credit"],
      },
      {
        name: "autoSubscribe",
        label: "Auto Subscribe",
        type: "checkbox",
        initialValue: false,
        validation: yup.boolean(),
      },
      {
        name: "autoSubscribeMessage",
        label: "Auto Subscribe Message",
        type: "select",
        initialValue: "",
        validation: yup.string().required("Message is required"),
        options: ["I agree to receive", "I dont agree to receive"],
      },
      {
        name: "specialRequirements",
        label: "Special Requirements",
        type: "multi-input",
        initialValue: [""],
        validation: yup.array().of(yup.string()),
        information:
          "Other special rider app requests? (Such as Branch links integration- for deep link quote API, special design request, etc..)",
      },
      {
        name: "supportEmail",
        label: "Support Email",
        type: "email",
        initialValue: "",
        validation: yup.string().email("Must be a valid email"),
      },
      {
        name: "languages",
        label: "Language",
        type: "multi-select",
        initialValue: "",
        validation: yup
          .array()
          .of(yup.string().required("Language is required")),
        options: [
          "en",
          "ar",
          "he",
          "es",
          "fr",
          "de",
          "it",
          "ja",
          "ko",
          "pt",
          "ru",
          "zh",
        ],
      },
    ],
  },

  // Second step
  {
    tabName: "Onboarding & Subtitles",
    fields: [
      {
        name: "onBoarding",
        label: "Onboarding Messages",
        type: "multi-input",
        initialValue: [""],
        information: "asd",
        validation: yup.array().of(yup.string()),
      },
      {
        name: "subTitle",
        label: "Subtitles",
        type: "multi-input",
        initialValue: [""],
        information: "asd",
        validation: yup.array().of(yup.string()),
      },
    ],
  },

  // Third step
  {
    tabName: "Branding & Additional Info",
    fields: [
      {
        name: "whoBranded",
        label: "Who Branded",
        type: "text",
        initialValue: "",
        validation: yup.string(),
      },
      {
        name: "serviceLogoImage",
        label: "Service Logo Image",
        type: "file",
        initialValue: "",
        information: "asd",
        validation: yup.mixed(),
        //.fileSize(1024 * 1024 * 5, "File size must be less than 5MB")
        //.fileType(["image/jpeg", "image/png", "image/gif"],"Unsupported File Format")
        //.required("A file is required")
        imageExample:
          "https://lh7-us.googleusercontent.com/TnIC1bWi1llg0xqgXI0jTe-LIncftABhkeyJbWb6NbYVuNOarQrvNpqXUjJBlWsYK2JdDWCkRd2vBQBK6l6TeufyC3ujPOXbhJ1k6lxVAcqXLExpUo0d4OJByVbb9Se2qnEuBxE3qAdAiSS4RoZMAowRzk-SLA",
      },
      {
        name: "poweredBy",
        label: "Powered By",
        type: "text",
        initialValue: "",
        validation: yup.string(),
      },
      {
        name: "operetedBy",
        label: "Operated By",
        type: "conditional-select",
        initialValue: "",
        options: ["Option 1", "Option 2"],
        validation: yup.string(),
      },
      {
        name: "preferredTitle",
        label: "Preferred Title",
        type: "text",
        initialValue: "",
        validation: yup.string(),
      },
      {
        name: "providingAppLauncer",
        label: "Providing App Launcher",
        type: "checkbox",
        initialValue: false,
        validation: yup.boolean(),
      },
      {
        name: "appLauncer",
        label: "App Launcher",
        type: "text",
        initialValue: "",
        validation: yup.string().optional(),
      },
      {
        name: "skylineImage",
        label: "Skyline Image",
        type: "file",
        initialValue: "",
        validation: yup.mixed(),
        //.fileSize(1024 * 1024 * 5, "File size must be less than 5MB")
        //.fileType(["image/jpeg", "image/png", "image/gif"],"Unsupported File Format")
        //.required("A file is required"),
      },
      {
        name: "skylineOption",
        label: "Skyline Option",
        type: "select",
        initialValue: "",
        validation: yup.string(),
        options: ["Option 1", "Option 2"],
      },
      {
        name: "VheicleOption",
        label: "Vehicle Option",
        type: "select",
        initialValue: "",
        validation: yup.string(),
        options: ["Option 1", "Option 2"],
      },
      {
        name: "VheicleOptionImage",
        label: "Vehicle Option Image",
        type: "file",
        initialValue: "",
        validation: yup.mixed(),
        //.fileSize(1024 * 1024 * 5, "File size must be less than 5MB")
        //.fileType(["image/jpeg", "image/png", "image/gif"],"Unsupported File Format")
        //.required("A file is required"),
      },
      {
        name: "prefferdBrandColor",
        label: "Preferred Brand Color",
        type: "text",
        initialValue: "",
        validation: yup.string(),
      },
      {
        name: "chooseBrandColorFromLogo",
        label: "Choose Brand Color From Logo",
        type: "checkbox",
        initialValue: false,
        validation: yup.boolean(),
      },
      {
        name: "additionalInformation",
        label: "Additional Information",
        type: "multi-input",
        initialValue: [""],
        validation: yup.array().of(yup.string()),
      },
    ],
  },
];
