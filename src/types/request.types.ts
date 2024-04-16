export type RequestType = {
  status: "pending" | "inProgress" | "done";
  [key: string]: string | number | boolean | string[] | Date | undefined;
};

export interface AppRequestType extends RequestType {
  riderAppName: string;
  riderAppShortName: string;
  launchDate: string;
  jiraProjectLink: string;
  externalLinks: string[];
  serviceType: string;
  servicePaymentType: string;
  autoSubscribe: boolean;
  autoSubscribeMessage: string;
  specialRequirements: string[];
  supportEmail: string;
  languages: string[];
  onBoarding: string[];
  subTitle: string[];
  whoBranded: string;
  serviceLogoImage: string;
  poweredBy: string;
  operatedBy: string;
  preferredTitle: string;
  providingAppLauncher: boolean;
  appLauncher?: string;
  skylineImage?: string;
  skylineOption?: string;
  VehicleOption?: string;
  VehicleOptionImage?: string;
  preferredBrandColor?: string;
  chooseBrandColorFromLogo: string;
  additionalInformation: string[];
}

export interface RequestEditAppType extends RequestType {
  env?: string;
  tenant?: string;
  city?: string;
  country?: string;
  region?: string;
  iosFolder?: string;
  androidFolder?: string;
  colorSpecs?: string;
  figmaAppName?: string;
  webAppFigmaLink?: string;
  webAppLink?: string;
}

export interface RequestEditUserType extends RequestType {
  authorization: string;
}

export interface RequestEditConfigurationType extends RequestType {
  key: string;
  value: string | number | boolean | string[] | Date | undefined;
}
