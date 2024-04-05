import * as yup from "yup";
import { RequestType } from "./request.types";

export type FieldConfig<T extends RequestType> = {
  name: Extract<keyof T, string>;
  label: string;
  initialValue: string | string[] | boolean | number | Date | undefined;
  type:
    | "text"
    | "email"
    | "date"
    | "checkbox"
    | "select"
    | "multi-select"
    | "textarea"
    | "file"
    | "radio"
    | "number"
    | "multi-input"
    | "conditional-select";
  validation: yup.AnySchema;
  options?: string[];
  information?: string;
  imageExample?: string;
  bucketName?: string;
};

export type TabConfig<T extends RequestType> = {
  tabName: string;
  fields: FieldConfig<T>[];
  bucketName?: string;
  submit?: (values: T) => void;
};
