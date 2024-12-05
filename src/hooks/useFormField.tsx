import { useFormContext } from "react-hook-form";
export const useFormField = (name: string) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);

  const onChange = (value: string) => {
    setValue(name, value);
  };

  return { ...register(name), error: errors[name], value, onChange };
};
