import UserProfile from "../../models/profile.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUserRegistration {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  contact?: string;
}

class AuthService {
  
  async signUp(userData: IUserRegistration) {
    try {
      const { name, email, password, age, gender, contact } = userData;

      
      const existingUser = await UserProfile.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      
      const hashedPassword = await bcrypt.hash(password, 10);

      
      const newUser = new UserProfile({
        name,
        email,
        password: hashedPassword,
        age,
        gender,
        contact,
      });

      await newUser.save();

      
      const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
      });

      return { token, user: newUser };
    } catch (error) {
      throw new Error(`Signup error: ${error.message}`);
    }
  }

  
  async signIn(email: string, password: string) {
    try {
      const user = await UserProfile.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
      });

      return { token, user };
    } catch (error) {
      throw new Error(`Login error: ${error.message}`);
    }
  }
}

export default new AuthService();
