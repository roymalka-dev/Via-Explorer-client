import { useState } from "react";

interface UseFormStepperReturn {
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

/**
 * Custom React hook for managing form steps in a stepper component.
 *
 * @param {number} [initialStep=0] - The initial step of the form, defaults to 0.
 * @returns {object} An object containing the current step and functions to navigate between steps.
 */
export const useFormStepper = (initialStep = 0): UseFormStepperReturn => {
  /**
   * State variables to keep track of the current step.
   * @type {number}
   */
  const [currentStep, setCurrentStep] = useState(initialStep);

  /**
   * Function to navigate to the next step in the form.
   *
   * @returns {void}
   */
  const goToNextStep = () => setCurrentStep((prevStep) => prevStep + 1);

  /**
   * Function to navigate to the previous step in the form.
   *
   * @returns {void}
   */
  const goToPreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  return { currentStep, goToNextStep, goToPreviousStep };
};
