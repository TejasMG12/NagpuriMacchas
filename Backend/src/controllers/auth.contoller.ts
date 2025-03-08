import { Request, Response } from "express";
import authService from "../handlers/user/auth.service";

class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      const { name, email, password, age, gender } = req.body;
      const { token, user } = await authService.signUp({ name, email, password, age, gender});

      res.status(201).json({ message: "Signup successful", token, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await authService.signIn(email, password);

      res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

export default new AuthController();
