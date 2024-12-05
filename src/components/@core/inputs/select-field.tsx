import type { FC } from "react";
import { useFormField } from "@/hooks/useFormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Error from "./error";

interface SelectFieldProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
}

const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  options,
  ...props
}) => {
  const { ref, error, onChange, ...field } = useFormField(name);

  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="capitalize">
        {label}
      </label>

      <Select {...field} {...props} onValueChange={onChange}>
        <SelectTrigger className="w-full" id={name} ref={ref}>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent className="dark:bg-[#08060F]">
          {options?.map((option) => (
            <SelectItem key={option?.label} value={option?.value}>
              {option?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <Error msg={String(error?.message)} />}
    </div>
  );
};

export default SelectField;
