import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";


export interface IUserProfile extends Document {
    userId: string|null;
    name: string;
    email: string;
    password: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    
    medicalHistory?: {
        allergies?: string[];
        chronicDiseases?: string[];
        medications?: string[];
    };
    vitals?: {
        bloodPressure?: string;
        bloodSugar?: number;
        heartRate?: number;
        weight?: number;
        height?: number;
    };
    healthGoals?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}


const UserProfileSchema = new Schema<IUserProfile>(
    {
        userId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
        
        medicalHistory: {
            allergies: [{ type: String }],
            chronicDiseases: [{ type: String }],
            medications: [{ type: String }],
        },
        vitals: {
            bloodPressure: { type: String },
            bloodSugar: { type: Number },
            heartRate: { type: Number },
            weight: { type: Number },
            height: { type: Number },
        },
        healthGoals: [{ type: String }],
    },
    { timestamps: true }
);


UserProfileSchema.pre<IUserProfile>("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


UserProfileSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

const UserProfile = mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);

export default UserProfile;
