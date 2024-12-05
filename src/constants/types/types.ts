export interface MenuItem {
  title: string;
  url: string;
  icon: string;
  shortcut: string[];
  isActive: boolean;
  items: MenuItem[];
}

export interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  employment: string;
}

export interface Applicant {
  name: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  department: string;
  cv: string;
}
