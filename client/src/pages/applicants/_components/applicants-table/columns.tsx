"use client";

import { Button } from "@/components/ui/button";
import { Applicant } from "@/constants/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, FileDown } from "lucide-react";
import { CellAction } from "./cell-action";

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
    accessorKey: "experience",
    header: "Experience",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "cv",
    header: "CV",
    cell: ({ row }) => {
      const handleExportStory = () => {};

      return (
        <Button
          onClick={handleExportStory}
          disabled={!row.original.cv}
          variant="outline"
          size={"icon"}
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
