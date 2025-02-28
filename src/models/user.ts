import mongoose, { CallbackError } from "mongoose";
import bcrypt from "bcryptjs";

// Define the schema interface if needed
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    // Cast `err` to `CallbackError` or just use `any`
    next(err as CallbackError);
  }
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
