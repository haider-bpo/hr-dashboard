import { Job } from "@/features/jobs/jobTypes";
import { MenuItem } from "./types/types";
import { Applicant } from "@/features/applicants/applicantTypes";

export const navItems: MenuItem[] = [
  {
    title: "Posted Jobs",
    url: "/dashboard/posted-jobs",
    icon: "user",
    items: [], // No child items
  },
  {
    title: "Applied Jobs",
    url: "/dashboard/applied-jobs",
    icon: "user",
    items: [], // No child items
  },
];

export const jobs: Job[] = [
  {
    _id: "1",
    title: "Software Engineer",
    type: "full-time",
    location: "New York, NY",
    department: "custom-development",
    employment: "permanent",
    description: "Software Engineer with experience ",
  },
  {
    _id: "2",
    title: "Product Manager",
    type: "full-time",
    location: "San Francisco, CA",
    department: "custom-development",
    employment: "permanent",
    description: "Software Engineer with experience ",
  },
  {
    _id: "3",
    title: "Data Analyst",
    type: "part-time",
    location: "Remote",
    department: "custom-development",
    employment: "contract",
    description: "Software Engineer with experience ",
  },
  {
    _id: "4",
    title: "HR Specialist",
    type: "full-time",
    location: "Chicago, IL",
    department: "custom-development",
    employment: "permanent",
    description: "Software Engineer with experience ",
  },
  {
    _id: "5",
    title: "Marketing Coordinator",
    type: "part-time",
    location: "Remote",
    department: "custom-development",
    employment: "Temporary",
    description: "Software Engineer with experience ",
  },
  {
    _id: "6",
    title: "Frontend Developer",
    type: "full-time",
    location: "Austin, TX",
    department: "custom-development",
    employment: "permanent",
    description: "Software Engineer with experience ",
  },
  {
    _id: "7",
    title: "Backend Developer",
    type: "full-time",
    location: "Seattle, WA",
    department: "custom-development",
    employment: "permanent",
    description: "Software Engineer with experience ",
  },
  {
    _id: "8",
    title: "UI/UX Designer",
    type: "part-time",
    location: "Remote",
    department: "custom-development",
    employment: "contract",
    description: "Software Engineer with experience ",
  },
  {
    _id: "9",
    title: "Cybersecurity Analyst",
    type: "full-time",
    location: "Washington, D.C.",
    department: "custom-development",
    employment: "permanent",
    description: "Software Engineer with experience ",
  },
  {
    _id: "10",
    title: "Sales Representative",
    type: "full-time",
    location: "Dallas, TX",
    department: "sales",
    employment: "permanent",
    description: "Software Engineer with experience ",
  },
  {
    _id: "11",
    title: "Content Writer",
    type: "part-time",
    location: "Remote",
    department: "custom-development",
    employment: "contract",
    description: "Software Engineer with experience ",
  },
  {
    _id: "12",
    title: "DevOps Engineer",
    type: "full-time",
    location: "Boston, MA",
    department: "sales",
    employment: "permanent",
    description: "Software Engineer with experience ",
  },
];

export const applicants: Applicant[] = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    city: "New York",
    experience: "5 years",
    department: "custom-development",
    resume:
      "https://res.cloudinary.com/demo/image/upload/v1234567890/johndoe_resume.pdf",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+1987654321",
    city: "San Francisco",
    experience: "3 years",
    department: "custom-development",
    resume:
      "https://res.cloudinary.com/demo/image/upload/v1234567890/janesmith_resume.pdf",
  },
  {
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    phone: "+1123456789",
    city: "Los Angeles",
    experience: "7 years",
    department: "sales",
    resume:
      "https://res.cloudinary.com/demo/image/upload/v1234567890/michaelbrown_resume.pdf",
  },
  {
    name: "Emily Davis",
    email: "emilydavis@example.com",
    phone: "+1212345678",
    city: "Chicago",
    experience: "2 years",
    department: "custom-development",
    resume:
      "https://res.cloudinary.com/demo/image/upload/v1234567890/emilydavis_resume.pdf",
  },
  {
    name: "Robert Wilson",
    email: "robertwilson@example.com",
    phone: "+1239876543",
    city: "Houston",
    experience: "6 years",
    department: "custom-development",
    resume:
      "https://res.cloudinary.com/demo/image/upload/v1234567890/robertwilson_resume.pdf",
  },
  {
    name: "Sophia Johnson",
    email: "sophiajohnson@example.com",
    phone: "+1987123456",
    city: "Seattle",
    experience: "4 years",
    department: "custom-development",
    resume:
      "https://res.cloudinary.com/demo/image/upload/v1234567890/sophiajohnson_resume.pdf",
  },
];
