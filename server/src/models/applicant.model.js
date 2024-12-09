import { model, Schema } from "mongoose";

const applicantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  resume: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Applicant = model("Applicant", applicantSchema);

export default Applicant;
