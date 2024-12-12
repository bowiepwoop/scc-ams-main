import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    number: { type: String, required: true },
    level: { type: String, required: true },
    section: { type: String, required: true }, // Added Section field
    address: { 
      line1: { type: String, required: true }, 
      line2: { type: String, required: true } 
    }, // Address structured into two fields
    code: { type: String, required: true, unique: true } // RFID code field
  },
  { minimize: false } // Ensure all empty objects or arrays are preserved
);

const studentModel = mongoose.models.student || mongoose.model("student", studentSchema);
export default studentModel;
