import { useFormField } from "@/hooks/useFormField";
import { Input } from "../../ui/input";

import type { FC } from "react";
import Error from "./error";
import { Label } from "@/components/ui/label";

interface InputFieldProps {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
}

const InputField: FC<InputFieldProps> = ({
  label,
  placeholder,
  name,
  type,
  ...props
}) => {
  const { error, value, onChange } = useFormField(name);

  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <Input
        id={name}
        type={type || "text"}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
      {error && <Error msg={String(error?.message)} />}
    </div>
  );
};

export default InputField;
