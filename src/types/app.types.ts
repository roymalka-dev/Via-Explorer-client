export type appBuildVersionType = {
  version: string;
  link: string;
};

export type appType = {
  id: string;
  name: string;
  queryName?: string;
  iosAppId?: string;
  androidAppId?: string;
  env: string;
  tenant: string;
  city: string;
  country: string;
  region: string;
  iosVersion?: string;
  iosLink?: string;
  iosRelease?: string;
  iosFolder?: string;
  iosBundleId?: string;
  iosBuilds?: appBuildVersionType[];
  iosScreenshots?: string[];
  iosCurrentVersionReleaseDate?: string;
  androidVersion?: string;
  androidRelease?: string;
  androidFolder?: string;
  androidLink?: string;
  androidBuilds?: appBuildVersionType[];
  androidScreenshots?: string[];
  androidCurrentVersionReleaseDate?: string;
  languages?: string[];
  colorSpecs?: string;
  figmaAppName?: string;
  webAppFigmaLink?: string;
  webAppLink?: string;
  lastStoreUpdate?: number;
  imageUrl?: string;
  pso?: string;
  psm?: string;
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
