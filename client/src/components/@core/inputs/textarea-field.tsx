import { useFormField } from "@/hooks/useFormField";
import type { FC } from "react";
import Error from "./error";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextFieldProps {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
}

const TextareaField: FC<TextFieldProps> = ({
  label,
  placeholder,
  name,
  ...props
}) => {
  const { error, value, onChange } = useFormField(name);

  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <Textarea
        id={name}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
      {error && <Error msg={String(error?.message)} />}
    </div>
  );
};

export default TextareaField;
