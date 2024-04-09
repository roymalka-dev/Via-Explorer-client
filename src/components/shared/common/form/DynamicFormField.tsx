/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Field } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FieldConfig } from "@/types/form.types";

import DragDropFileInput from "../../ui/inputs/DragDropFileInput";
import MultiInputField from "../../ui/inputs/MultiInputField";
import MultiSelectField from "../../ui/inputs/MultiSelectField";
import SelectField from "../../ui/inputs/SelectField";
import TextFieldWithInfo from "../../ui/inputs/TextFieldAndInfo";
import ConditionalSelect from "../../ui/inputs/ConditionalSelect";
import { RequestType } from "@/types/request.types";

/**
 * DynamicField component renders different form input fields based on the type provided in FieldConfig.
 * @param {FieldConfig<RequestType>} props - Component props containing field configuration.
 * @returns {JSX.Element} DynamicField component
 */
const DynamicField: React.FC<FieldConfig<RequestType>> = ({
  name,
  label,
  type,
  options,
  information,
  imageExample,
  bucketName,
}) => {
  return (
    <Field name={name}>
      {({ field }: any) => {
        if (type === "checkbox") {
          return (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label={label}
            />
          );
        }

        if (type === "select") {
          return (
            <SelectField
              name={String(name)}
              label={label}
              options={options || []}
              information={information}
              imageExample={imageExample}
            />
          );
        }

        // Handle multi-select
        if (type === "multi-select") {
          return (
            <MultiSelectField
              name={String(name)}
              label={label}
              options={options || []}
              information={information}
              imageExample={imageExample}
            />
          );
        }

        if (type === "multi-input") {
          return (
            <MultiInputField
              name={String(name)}
              label={label}
              information={information}
              imageExample={imageExample}
            />
          );
        }

        if (type === "file") {
          return (
            <DragDropFileInput
              name={String(name)}
              label={label}
              information={information}
              imageExample={imageExample}
              bucketName={bucketName}
            />
          );
        }

        if (type === "conditional-select") {
          return (
            <ConditionalSelect
              name={String(name)}
              selectLabel={label}
              textFieldLabel="Specify Other"
              options={options || []}
              information="More information about this field"
              imageExample={imageExample}
            />
          );
        }

        return (
          <TextFieldWithInfo
            name={String(name)}
            label={label}
            type={type}
            information={information}
            imageExample={imageExample || ""}
            InputLabelProps={type === "date" ? { shrink: true } : {}}
          />
        );
      }}
    </Field>
  );
};

export default DynamicField;
