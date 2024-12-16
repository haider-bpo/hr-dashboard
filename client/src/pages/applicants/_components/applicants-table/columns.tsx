"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, FileDown } from "lucide-react";
import { CellAction } from "./cell-action";
import { Applicant } from "@/features/applicants/applicantTypes";
import { downloadFileFromUrl } from "@/utils/downloadFile";

export const columns: ColumnDef<Applicant>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "experience",
    header: "Experience",
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) => {
      const downloadResume = async () => {
        const url = row.original.resume;
        const fileName = `${row.original.name || ""} resume.pdf`; // Default to "Untitled" if no name

        downloadFileFromUrl(url, fileName);
      };

      return (
        <Button
          onClick={downloadResume}
          disabled={!row.original.resume}
          variant="outline"
          size={"icon"}
          className="text-[#005BEA] hover:text-[#005BEA]/80"
        >
          <FileDown />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
