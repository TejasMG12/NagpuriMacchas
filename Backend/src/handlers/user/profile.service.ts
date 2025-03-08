import UserProfile, { IUserProfile } from "../../models/profile.model";

class ProfileService {
    async getProfileByEmail(email: string): Promise<IUserProfile | null> {
        try {
            const userProfile = await UserProfile.findOne({ email }).select("-password"); // Exclude password
            return userProfile;
        } catch (error) {
            throw new Error(`Error fetching profile: ${error.message}`);
        }
    }

    async addUserProfile(userData: IUserProfile): Promise<IUserProfile> {
        try {
            const newUser = new UserProfile(userData);
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error(`Error adding user profile: ${error.message}`);
        }
    }

    async updateUserProfile(email: string, updatedData: Partial<IUserProfile>): Promise<IUserProfile | null> {
        try {
            const userProfile = await UserProfile.findOne({ email }).select("-password"); // Exclude password
            const updatedUser = await UserProfile.findByIdAndUpdate(userProfile._id, updatedData, { new: true });
            if (!updatedUser) {
                throw new Error("User not found");
            }
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user profile: ${error.message}`);
        }
    }

    async deleteUserProfile(userId: string): Promise<boolean> {
        try {
            const result = await UserProfile.findByIdAndDelete(userId);
            return result ? true : false;
        } catch (error) {
            throw new Error(`Error deleting user profile: ${error.message}`);
        }
    }
}

export default new ProfileService();
