import { useEffect } from "react";
import type { FC } from "react";
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
import {
  useAddJob,
  useGetJobById,
  useUpdateJob,
} from "@/features/jobs/jobSelectors";
import TextareaField from "@/components/@core/inputs/textarea-field";

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
      component: InputField,
      name: "location",
      label: "Location",
      placeholder: "Enter job location",
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
      component: SelectField,
      name: "department",
      label: "Department",
      options: getEnumOptions(DepartmentEnum),
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
  [
    {
      component: TextareaField,
      name: "description",
      label: "Description",
      placeholder: "Enter job description",
    },
  ],
];

interface JobFormProps {
  jobId?: string;
}

const JobForm: FC<JobFormProps> = ({ jobId }) => {
  const addJob = useAddJob();
  const updateJob = useUpdateJob();
  const getJobById = useGetJobById();

  type JobFormData = z.infer<typeof jobFormSchema>;
  const methods = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {}, // Initialize empty, will update later
  });

  useEffect(() => {
    if (jobId && jobId !== "create") {
      // Fetch job details when jobId exists
      const fetchJobDetails = async () => {
        const jobDetails = await getJobById(jobId);
        
        // Convert strings to enums where needed
        const updatedJob = {
          ...jobDetails,
          department: jobDetails?.department as DepartmentEnum,
          employment: jobDetails?.employment as EmploymentTypeEnum,
          type: jobDetails?.type as JobTypeEnum,
        };

        // Set form values using the fetched job details
        methods.reset(updatedJob);
      };
      fetchJobDetails();
    }
  }, [jobId, methods, getJobById]);

  const onSubmit = async (data: JobFormData) => {
    console.log(data);

    if (!jobId) {
      await addJob(data);
      methods.reset();
    } else {
      const newUpdatedJob = await updateJob(jobId, data);
      // Convert strings to enums where needed
      const updatedJob = {
        ...newUpdatedJob,
        department: newUpdatedJob?.department as DepartmentEnum,
        employment: newUpdatedJob?.employment as EmploymentTypeEnum,
        type: newUpdatedJob?.type as JobTypeEnum,
      };
      methods.reset(updatedJob);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-y-3 md:gap-y-7">
          {/* Render Fields Dynamically */}
          {jobCreationFormFields.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 md:grid-cols-${
                row.length || 2
              } gap-x-16 gap-y-3`}
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
};

export default JobForm;
