/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FieldArray, useField, useFormikContext } from "formik";
import { Box, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InformationTooltip from "../tools/InformationTooltip";
import ImageExampleTooltip from "../tools/ImageExampleToolTip";
import { getConfigValue } from "@/utils/configurations.utils";

interface MultiInputFieldProps {
  name: string;
  label: string;
  information?: string | React.ReactNode;
  imageExample?: string;
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({
  name,
  label,
  information,
  imageExample,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField<string[]>(name);

  const NUMBER_OF_MAX_ALLOWED_FORM_MULTI_INPUT_FIELDS = Number(
    getConfigValue("NUMBER_OF_MAX_ALLOWED_FORM_MULTI_INPUT_FIELDS", 6)
  );

  return (
    <FieldArray name={name}>
      {({ remove, insert }) => (
        <Box>
          {field.value.map((item, index) => (
            <Box
              key={`${name}-${index}`}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <TextField
                name={`${name}.${index}`}
                label={label}
                value={item}
                onChange={(e) =>
                  setFieldValue(`${name}.${index}`, e.target.value)
                }
                fullWidth
                variant="outlined"
                margin="dense"
              />
              <IconButton
                onClick={() => remove(index)}
                disabled={field.value.length === 1}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => insert(index + 1, "")}
                disabled={
                  field.value.length >=
                    NUMBER_OF_MAX_ALLOWED_FORM_MULTI_INPUT_FIELDS ||
                  field.value[index] === "" ||
                  field.value[0] === ""
                }
              >
                <AddCircleIcon />
              </IconButton>
              {index === field.value.length - 1 && (
                <>
                  {information && (
                    <InformationTooltip information={information} />
                  )}
                  {imageExample && (
                    <ImageExampleTooltip imageUrl={imageExample} />
                  )}
                </>
              )}
            </Box>
          ))}
        </Box>
      )}
    </FieldArray>
  );
};

export default MultiInputField;
