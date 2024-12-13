export interface Job {
  _id?: string; // Optional if the job is not yet saved to the database
  title: string;
  department: string;
  employment: string;
  location: string;
  type: string;
  status?: boolean; // Optional since it has a default value
  createdAt?: string; // Timestamps added by Mongoose
  updatedAt?: string; // Timestamps added by Mongoose
}
