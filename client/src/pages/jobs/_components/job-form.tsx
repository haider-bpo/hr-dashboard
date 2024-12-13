import InputField from "@/components/@core/inputs/input-field";
import SelectField from "@/components/@core/inputs/select-field";
import RadioField from "@/components/@core/inputs/radio-field";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

import { jobFormSchema } from "@/schemas/job-form-schema";
import {
  DepartmentEnum,
  EmploymentTypeEnum,
  JobTypeEnum,
} from "@/constants/enums/job-enums";
import { getEnumOptions } from "@/utils/enum-utils";
import { useAddJob } from "@/features/jobs/jobSelectors";

// Form field configuration
const jobCreationFormFields = [
  [
    {
      component: InputField,
      name: "title",
      label: "Title",
      placeholder: "Enter job title",
    },
    {
      component: SelectField,
      name: "department",
      label: "Department",
      options: getEnumOptions(DepartmentEnum),
    },
  ],
  [
    {
      component: SelectField,
      name: "employment",
      label: "Employment Type",
      options: getEnumOptions(EmploymentTypeEnum),
    },
    {
      component: InputField,
      name: "location",
      label: "Location",
      placeholder: "Enter job location",
    },
  ],
  [
    {
      component: RadioField,
      name: "type",
      label: "Type",
      options: getEnumOptions(JobTypeEnum),
    },
  ],
];

function JobForm() {
  const addJob = useAddJob();

  type JobFormData = z.infer<typeof jobFormSchema>;
  const methods = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
  });

  const onSubmit = async (data: JobFormData) => {
    console.log(data);
    await addJob(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-y-3 md:gap-y-7">
          {/* Render Fields Dynamically */}
          {jobCreationFormFields.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3"
            >
              {row.map(({ component: Component, ...props }, colIndex) => (
                <div key={colIndex}>
                  <Component {...(props as any)} />
                </div>
              ))}
            </div>
          ))}

          {/* Submit Button */}
          <Button size="lg" variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default JobForm;
