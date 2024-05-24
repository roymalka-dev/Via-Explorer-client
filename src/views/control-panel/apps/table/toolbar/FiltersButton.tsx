import React from "react";
import ComplexFilterButton, {
  ComplexFilterFunctionOption,
} from "@/components/shared/ui/buttons/ComplexFiltersButton";
import { filterTypes, filterFunctions } from "../../data/filters";

interface FiltersButtonProps {
  handleComplexFilters: (
    filterType: string,
    filterFunction: ComplexFilterFunctionOption | undefined,
    filterValue: string
  ) => void;
}

const FiltersButton: React.FC<FiltersButtonProps> = ({
  handleComplexFilters,
}) => {
  return (
    <ComplexFilterButton
      filterTypes={filterTypes}
      filterFunctions={filterFunctions}
      handler={handleComplexFilters}
    />
  );
};

export default FiltersButton;
