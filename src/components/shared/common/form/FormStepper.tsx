import { useState } from "react";
import { Formik, Form } from "formik";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, updateForm } from "@/store/slices/formSlice"; // Update this path to your actual slice file
import { TabConfig } from "@/types/form.types";
import {
  generateValidationSchemas,
  generateInitialValues,
} from "@/utils/form.utils";
import DynamicFormField from "@/components/shared/common/form/DynamicFormField";
import { RequestType } from "@/types/request.types";
import { RootState } from "@/store/store";

// Ensure the types and utility functions you're importing are defined and imported correctly

export const FormStepper = <T extends RequestType>({
  tabs,
  bucketName,
  submit,
}: {
  tabs: TabConfig<T>[];
  bucketName: string;
  submit: (request: T) => void;
}) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState<number>(0);
  const isLastStep = activeStep === tabs.length - 1;
  const savedFormData = useSelector((state: RootState) => state.form.formData);
  const validationSchemas = generateValidationSchemas<T>(tabs);
  const initialValues = generateInitialValues<T>(tabs, savedFormData);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[activeStep]}
      onSubmit={(values, actions) => {
        if (!isLastStep) {
          setActiveStep((prev) => prev + 1);
          dispatch(updateForm(values));
        } else {
          dispatch(resetForm());
          try {
            submit(values);
          } catch (error) {
            console.error("Error submitting form:", error);
          }
        }
        actions.setTouched({});
        actions.setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <Stepper activeStep={activeStep} alternativeLabel>
            {tabs.map((tab, index) => (
              <Step key={index}>
                <StepLabel>{tab.tabName}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 2 }}>
            {tabs[activeStep].fields.map((field, index) => (
              <Box key={`${field.name}-${index}`} sx={{ mt: 2 }}>
                <DynamicFormField {...field} bucketName={bucketName} />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => prev - 1)}
            >
              Back
            </Button>
            <Button type="submit">{isLastStep ? "Submit" : "Next"}</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
