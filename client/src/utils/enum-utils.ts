interface paramsType {
  value: string;
  label: string;
}
export function getEnumOptions(enumObject: object): paramsType[] {
  return Object.values(enumObject).map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1), // Capitalizing first letter
  }));
}
