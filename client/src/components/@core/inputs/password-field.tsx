"use client";
import { Input } from "@/components/ui/input";
import { useFormField } from "@/hooks/useFormField";
import { useState, type FC } from "react";
import Error from "./error";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";

interface PasswordFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const PasswordField: FC<PasswordFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { error, value, onChange } = useFormField(name);

  return (
    <div className="relative grid gap-2">
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <Input
        id={name}
        type={showPassword ? "text" : type || "password"} // Toggle password visibility
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
      <Button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute bottom-0 right-0 text-inherit bg-inherit hover:bg-inherit flex items-center focus:outline-none"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </Button>
      {error && <Error msg={String(error?.message)} />}
    </div>
  );
};

export default PasswordField;
