/* eslint-disable @typescript-eslint/no-explicit-any */
export const addItemHandler = (
  component: any,
  formGenerator: () => JSX.Element
) => {
  component.setContent(() => formGenerator());
  component.openModal();
};
