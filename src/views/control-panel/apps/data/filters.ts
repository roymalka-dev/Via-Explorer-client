import {
  ComplexFilterFunctionOption,
  ComplexFilterOption,
} from "@/components/shared/ui/buttons/ComplexFiltersButton";

export const filterTypes: ComplexFilterOption[] = [
  { value: "id", label: "ID" },
  { value: "service_status", label: "Status" },

  { value: "name", label: "Name" },
  { value: "iosVersion", label: "ios Version" },
  { value: "androidVersion", label: "android Version" },
  { value: "region", label: "Region" },
  { value: "country", label: "Country" },
  { value: "pso", label: "PSO" },
  { value: "psm", label: "PSM" },
  { value: "iosCurrentVersionReleaseDate", label: "IOS latest version" },
  {
    value: "androidCurrentVersionReleaseDate",
    label: "Android latest version",
  },
];

export const filterFunctions: ComplexFilterFunctionOption[] = [
  {
    value: "contains",
    label: "Contains",
    function: (itemValue: string, filterValue: string) =>
      itemValue.toLowerCase().includes(filterValue.toLowerCase()),
  },
  {
    value: "notContains",
    label: "Does Not Contain",
    function: (itemValue: string, filterValue: string) =>
      !itemValue.toLowerCase().includes(filterValue.toLowerCase()),
  },
  {
    value: "equals",
    label: "Equals",
    function: (itemValue: string, filterValue: string) =>
      itemValue.toLowerCase() === filterValue.toLowerCase(),
  },
  {
    value: "notEquals",
    label: "Does Not Equal",
    function: (itemValue: string, filterValue: string) =>
      itemValue.toLowerCase() !== filterValue.toLowerCase(),
  },
  {
    value: "isBefore",
    label: "is Before",
    function: (itemValue: string, filterValue: string) =>
      itemValue.toLowerCase() < filterValue.toLowerCase(),
  },
  {
    value: "isAfter",
    label: "is After",
    function: (itemValue: string, filterValue: string) =>
      itemValue.toLowerCase() > filterValue.toLowerCase(),
  },
];
