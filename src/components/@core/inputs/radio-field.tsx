import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormField } from "@/hooks/useFormField";
import type { FC } from "react";
import Error from "./error";

interface RadioFieldProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
}

const RadioField: FC<RadioFieldProps> = ({ label, name, options }) => {
  const { error, value, onChange } = useFormField(name);
  return (
    <div className="grid gap-y-1">
      <div className="mb-1">
        <Label>{label}</Label>
      </div>
      <RadioGroup
        defaultValue="comfortable"
        value={value}
        onValueChange={onChange}
      >
        {options.map((option) => (
          <div key={option.label} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.label} />
            <Label htmlFor={option.label}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {error && <Error msg={String(error?.message)} />}
    </div>
  );
};

export default RadioField;
