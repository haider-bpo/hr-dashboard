import InputField from "@/components/@core/inputs/input-field";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { jobFormSchema } from "@/schemas/job-form-schema";
import SelectField from "@/components/@core/inputs/select-field";
import { Button } from "@/components/ui/button";
import RadioField from "@/components/@core/inputs/radio-field";
import {
  DepartmentEnum,
  EmploymentTypeEnum,
  JobTypeEnum,
} from "@/constants/enums/job-enums";
import { getEnumOptions } from "@/utils/enum-utils";
function JobForm() {
  type JobFormData = z.infer<typeof jobFormSchema>;

  const methods = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
  });

  const onSubmit = (data: JobFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-y-3 md:gap-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-16">
            <InputField
              name="title"
              label="title"
              placeholder="Enter job title"
            />
            <SelectField
              name="department"
              label="department"
              options={getEnumOptions(DepartmentEnum)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-16">
            <SelectField
              name="employment"
              label="employment"
              options={getEnumOptions(EmploymentTypeEnum)}
            />

            <InputField
              name="location"
              label="location"
              placeholder="Enter job location"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-16">
            <RadioField
              name="type"
              label="Type"
              options={getEnumOptions(JobTypeEnum)}
            />
          </div>

          <Button size={"lg"} variant={"primary"} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default JobForm;
