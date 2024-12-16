import React, { useState } from 'react'
import { Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Job } from '@/features/jobs/jobTypes';

interface ViewJobDetailProps {
  job?: Job
}

export const ViewJobDetail: React.FC<ViewJobDetailProps> = ({ job }) => {
  const [open, setOpen] = useState(false)

  if (!job) {
    return null // Or you could return a placeholder or error state
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="text-[#005BEA] hover:text-[#005BEA]/80 transition-colors">
                <Eye className="h-5 w-5" />
                <span className="sr-only">View job details for {job.title}</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-[#005BEA] capitalize">{job.title}</SheetTitle>
                <SheetDescription className='capitalize'>
                {job.department} | {job.employment} | {job.location} | {job.type}
              </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-600">Job Description</h3>
                <p className="text-gray-400 whitespace-pre-wrap text-sm font-semibold">{job.description}</p>
              </div>
            </SheetContent>
          </Sheet>
        </TooltipTrigger>
        <TooltipContent>
          <p>View details for {job.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}


