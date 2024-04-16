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
        information:
          "Please provide the Jira project link for the service from LAP/DEAL board.",
      },
      {
        name: "externalLinks",
        label: "External Links",
        type: "multi-input",
        initialValue: [""],
        validation: yup.array().of(yup.string().url("Must be a valid URL")),
        information:
          "Provide external links such as websites and/or apps, Please make sure access is granted. if you provide a Figma file with all the material make sure all elements are vector (i.e. they don't contain images inside. Then, in the mandatory fields of this form a .png / screenshot of the relevant element can be uploaded instead because all vector files should be found in the Figma file).",
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
        information:
          "Automatically subscribe to receive information and offers (Opt in)? Defaults: US-checked, EU-unchecked",
        imageExample:
          "https://lh7-us.googleusercontent.com/VXMqlly_yodh13gtidlB2V_U-soZagsw6tVEhPKJIHHugZezLxe2y384NEXUeh9-M7bOKNlHogWHTzwqHiXRJLKkQW0x2b_k3rZf1Obqq8bHq6AUMsC9UEUUv49bNt4n4ZYEDUG4J34VAueaWUSgZF06JsgU-g",
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
        validation: yup
          .string()
          .email("Must be a valid email")
          .required("Support Email is required"),
        information:
          "(In case you don't have the email, please make sure to provide it later on the Monday board designated field)",
      },
      {
        name: "languages",
        label: "Language",
        type: "multi-select",
        initialValue: "",
        validation: yup
          .array()
          .of(yup.string().required("Language is required"))
          .required("language is required")
          .min(1, "At least one language is required"),
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
        information:
          "add onboarding messages to each lagnuage,  Default Title: Hi, we're [App name]!",
        imageExample:
          "https://lh7-us.googleusercontent.com/3mD0xFhnFLOa5tpLZCtrcEJA48iJiJMrVrGy_Dwf3Dy8ISPA6_uEbdvJxqO1hWiGBk3rkesL2oRD4_LsBdY2S1inzMWK1ZAp1KHb3VYrDjUlpH8VRYkvZsagJWDCs4b_fdlVYSHCo8uJrsoNxLruTkTmw_QKmQ",
        validation: yup.array().of(yup.string()),
      },
      {
        name: "subTitle",
        label: "Subtitles",
        type: "multi-input",
        initialValue: [""],
        information:
          "add subtitle messages to each lagnuage, Default Sub-Title: We make getting around easy and efficient",
        imageExample:
          "https://lh7-us.googleusercontent.com/3mD0xFhnFLOa5tpLZCtrcEJA48iJiJMrVrGy_Dwf3Dy8ISPA6_uEbdvJxqO1hWiGBk3rkesL2oRD4_LsBdY2S1inzMWK1ZAp1KHb3VYrDjUlpH8VRYkvZsagJWDCs4b_fdlVYSHCo8uJrsoNxLruTkTmw_QKmQ",
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
        type: "conditional-select",
        initialValue: "",
        options: ["Via Creative Studio"],
        validation: yup.string().required("Who Branded is required"),
        information:
          "please provide the Figma link including all relevant vector files",
      },
      {
        name: "serviceLogoImage",
        label: "Service Logo Image",
        type: "file",
        initialValue: "",
        information: "Vector graphics only",
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
        type: "conditional-select",
        options: ["Via", "Via japan"],
        initialValue: "",
        validation: yup.string().required("Powered By is required"),
      },
      {
        name: "operatedBy",
        label: "Operated By",
        type: "conditional-select",
        initialValue: "",
        options: [
          "Yes, we're providing an 'Operated by' logo in this form",
          "No, show only the 'Powered by Via' logo",
        ],
        validation: yup.string().required("Operated By is required"),
        information:
          "Is an 'Operated by' logo to be included next to the 'Powered by Via' logo? (in one line",
      },
      {
        name: "opereatedByLogo",
        label: "Operated By Logo",
        type: "file",
        initialValue: "",
        information: "Vector graphics only",
        validation: yup.mixed(),
        //.fileSize(1024 * 1024 * 5, "File size must be less than 5MB")
        //.fileType(["image/jpeg", "image/png", "image/gif"],"Unsupported File Format")
        //.required("A file is required")
      },
      {
        name: "preferredTitle",
        label: "Preferred Title",
        type: "conditional-select",
        options: [
          "Operated by",
          "Brought to you by",
          "In partnership with",
          "French app: Opéré par / Une solution Via",
        ],
        initialValue: "",
        validation: yup.string().required("Preferred Title is required"),
      },
      {
        name: "providingAppLauncher",
        label: "Providing App Launcher",
        type: "checkbox",
        initialValue: false,
        validation: yup.boolean(),
        information: "the app icon on the mobile device's desktop/homepage",
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
        information: "Vector graphics only",
        imageExample:
          "https://lh7-us.googleusercontent.com/-uNFBCAlhF3Umm1luAMV8JbQ-cGis1H3r-zvd1IykICyAHC8YJcD6OUh4gTVKepQeuW1ozh0TENo9_LfZkbxQ0lCablPF8lFS9b4Z1BrmhNsUl5ehrKyFPynvI-Hlx2G5tU4BTvoPQ_qpN67CK3CHSx2ZYr3Rg",
        validation: yup.mixed(),
        //.fileSize(1024 * 1024 * 5, "File size must be less than 5MB")
        //.fileType(["image/jpeg", "image/png", "image/gif"],"Unsupported File Format")
        //.required("A file is required"),
      },
      {
        name: "skylineOption",
        label: "Skyline Option",
        type: "conditional-select",
        initialValue: "",
        validation: yup.string(),
        options: [
          "Generic",
          "City",
          "Suburban/Industrial",
          "European Generic",
          "Rural",
          "European City",
          "Seashore",
          "No skyline",
        ],
      },
      {
        name: "VheicleOption",
        label: "Vehicle Option",
        type: "select",
        initialValue: "",
        validation: yup.string(),
        information: "Please select the vehicle option",
        imageExample:
          "https://lh7-us.googleusercontent.com/2QpaP_eJsIyZYHd4Yl3NBnQA5qahCIInB7wPraXuhXYhlkQn6Y6R0CnfWUXXH3RbcbMt_DI0_6cf2zA8TxvrZSPHwHNzylOa8VW5H4CfXxDzV59SXEcFwW-zv8VVYDcWcqSGXLX9-bAaOqbvZshDSdXx8uJQ9Q",
        options: [
          "Rounded Metris",
          "Metris",
          "Metris with riders",
          "WAV",
          "Van 1",
          "Sprinter",
          "AV",
          "Caravan (TAAS)",
          "Van 2",
          "Mini bus",
          "School Bus",
          "Bus",
          "Van 3",
          "Waste Management",
          "No vehicle",
          "We're providing a custom vehicle",
        ],
      },
      {
        name: "VheicleOptionImage",
        label: "Vehicle Option Image",
        type: "file",
        initialValue: "",
        information:
          "Send your own vehicle or choose from Via's default options, the Via team can add branding to the vehicle. Vector graphics only. If your app will be in any LTR language as Hebrew and Arabic the vehicle should be facing left. ",
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
        information:
          "From now on, the 'brand color' (formerly called 'primary color'), in combination with black, will be used throughout the app in different elements and, in addition, to distinguish between Pick-up and Drop-off elements. If there are more than one brand colors and there's a preferred color please mention it. Please note: in case the chosen color is not suitable we'll choose a darker variant of the same hue.",
        validation: yup.string(),
      },
      {
        name: "chooseBrandColorFromLogo",
        label: "Choose Brand Color From Logo",
        type: "conditional-select",
        options: ["I agree"],
        initialValue: "",
        validation: yup.string(),
      },
      {
        name: "additionalInformation",
        label: "Additional Information",
        type: "multi-input",
        initialValue: [""],
        information:
          "(special requirements and in-depth explanation). If you are sending over several options for one asset, please specify your preferences here.",
        validation: yup.array().of(yup.string()),
      },
    ],
  },
];
