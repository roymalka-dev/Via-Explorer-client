export type logType = {
  timestamp: Date;
  level: string;
  message: string;
  metadata: {
    tag: string;
    location: string;
  };
};
