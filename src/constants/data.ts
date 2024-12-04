
export type Job = {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  employment: string;
};


export const jobs: Job[] = [
  {
    id: "1",
    title: "Software Engineer",
    type: "Full-Time",
    location: "New York, NY",
    department: "Engineering",
    employment: "Permanent",
  },
  {
    id: "2",
    title: "Product Manager",
    type: "Full-Time",
    location: "San Francisco, CA",
    department: "Product",
    employment: "Permanent",
  },
  {
    id: "3",
    title: "Data Analyst",
    type: "Part-Time",
    location: "Remote",
    department: "Analytics",
    employment: "Contract",
  },
  {
    id: "4",
    title: "HR Specialist",
    type: "Full-Time",
    location: "Chicago, IL",
    department: "Human Resources",
    employment: "Permanent",
  },
  {
    id: "5",
    title: "Marketing Coordinator",
    type: "Part-Time",
    location: "Remote",
    department: "Marketing",
    employment: "Temporary",
  },
  {
    id: "6",
    title: "Frontend Developer",
    type: "Full-Time",
    location: "Austin, TX",
    department: "Engineering",
    employment: "Permanent",
  },
  {
    id: "7",
    title: "Backend Developer",
    type: "Full-Time",
    location: "Seattle, WA",
    department: "Engineering",
    employment: "Permanent",
  },
  {
    id: "8",
    title: "UI/UX Designer",
    type: "Part-Time",
    location: "Remote",
    department: "Design",
    employment: "Contract",
  },
  {
    id: "9",
    title: "Cybersecurity Analyst",
    type: "Full-Time",
    location: "Washington, D.C.",
    department: "IT",
    employment: "Permanent",
  },
  {
    id: "10",
    title: "Sales Representative",
    type: "Full-Time",
    location: "Dallas, TX",
    department: "Sales",
    employment: "Permanent",
  },
  {
    id: "11",
    title: "Content Writer",
    type: "Part-Time",
    location: "Remote",
    department: "Marketing",
    employment: "Contract",
  },
  {
    id: "12",
    title: "DevOps Engineer",
    type: "Full-Time",
    location: "Boston, MA",
    department: "Engineering",
    employment: "Permanent",
  },
  {
    id: "13",
    title: "Financial Analyst",
    type: "Full-Time",
    location: "Atlanta, GA",
    department: "Finance",
    employment: "Permanent",
  },
  {
    id: "14",
    title: "Quality Assurance Tester",
    type: "Part-Time",
    location: "Remote",
    department: "Engineering",
    employment: "Temporary",
  },
  {
    id: "15",
    title: "IT Support Specialist",
    type: "Full-Time",
    location: "Phoenix, AZ",
    department: "IT",
    employment: "Permanent",
  },
  {
    id: "16",
    title: "Operations Manager",
    type: "Full-Time",
    location: "Los Angeles, CA",
    department: "Operations",
    employment: "Permanent",
  },
  {
    id: "17",
    title: "Graphic Designer",
    type: "Part-Time",
    location: "Remote",
    department: "Design",
    employment: "Contract",
  },
  {
    id: "18",
    title: "Customer Success Manager",
    type: "Full-Time",
    location: "Denver, CO",
    department: "Customer Success",
    employment: "Permanent",
  },
  {
    id: "19",
    title: "Recruiter",
    type: "Part-Time",
    location: "Miami, FL",
    department: "Human Resources",
    employment: "Contract",
  },
  {
    id: "20",
    title: "AI Researcher",
    type: "Full-Time",
    location: "Palo Alto, CA",
    department: "Research",
    employment: "Permanent",
  },
];



export const navItems: any = [
  {
    title: 'Posted Jobs',
    url: '/dashboard/posted-jobs',
    icon: 'user',
    shortcut: ['e', 'e'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Applied Jobs',
    url: '/dashboard/applied-jobs',
    icon: 'user',
    shortcut: ['e', 'e'],
    isActive: false,
    items: [] // No child items
  }
];
