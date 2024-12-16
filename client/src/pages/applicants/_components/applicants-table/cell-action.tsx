"use client";
import { AlertModal } from "@/components/@core/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRemoveApplicant } from "@/features/applicants/applicantSelectors";
import { Applicant } from "@/features/applicants/applicantTypes";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";

interface CellActionProps {
  data: Applicant;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const removeApplicant = useRemoveApplicant();

  const deleteApplicant = async () => {
    await removeApplicant(data._id || "");
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteApplicant}
        loading={loading}
        title={`Delete Applicant "${data?.name} - (${data?.department})"`}
        description="Are you sure you want to delete this applicant?"
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
