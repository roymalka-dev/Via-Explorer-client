import { useState } from 'react';

interface UseFormStepperReturn {
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const useFormStepper = (initialStep = 0): UseFormStepperReturn => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToNextStep = () =>  setCurrentStep((prevStep) => prevStep + 1);
  const goToPreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  return { currentStep, goToNextStep, goToPreviousStep };
};
