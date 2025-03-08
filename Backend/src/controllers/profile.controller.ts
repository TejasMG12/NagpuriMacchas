import { Request, Response } from "express";
import profileService from "../handlers/user/profile.service";

class ProfileController {

    async getProfile(req: Request, res: Response) {
        try {
            const { email } = req.params;
            const profile = await profileService.getProfileByEmail(email);

            if (!profile) return res.status(404).json({ error: "Profile not found" });

            res.status(200).json({ profile });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async updateProfile(req: Request, res: Response) {
        try {
            const { email } = req.params;
            const updateData = req.body;
            const updatedProfile = await profileService.updateUserProfile(email, updateData);

            if (!updatedProfile) return res.status(404).json({ error: "Profile not found" });

            res.status(200).json({ message: "Profile updated", profile: updatedProfile });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async deleteProfile(req: Request, res: Response) {
        try {
            const { email } = req.params;
            const deleted = await profileService.deleteUserProfile(email);

            if (!deleted) return res.status(404).json({ error: "Profile not found" });

            res.status(200).json({ message: "Profile deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new ProfileController();
