export type appType = {
  id: string;
  name: string;
  env: string;
  tenant: string;
  city: string;
  country: string;
  region: string;
  iosVersion?: string;
  iosLink?: string;
  iosRelease?: string;
  iosFolder?: string;
  iosBuilds?: string[];
  iosScreenshots?: string[];
  androidVersion?: string;
  androidRelease?: string;
  androidFolder?: string;
  androidLink?: string;
  androidBuilds?: string[];
  androidScreenshots?: string[];
  languages?: string[];
  colorSpecs?: string;
  figmaAppName?: string;
  webAppFigmaLink?: string;
  webAppLink?: string;
  lastStoreUpdate?: number;
  imageUrl?: string;
};

export type itemsType = {
  name: string;
  id: string | number;
};

export type appSorterType = {
  name: string;
  comperator: (a: appType, b: appType) => number;
};

export type appFilterType = {
  name: string;
  filter: (app: appType) => boolean;
};
