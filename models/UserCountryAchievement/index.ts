import mongoose from "mongoose";

interface UserCountryAchievement {
  userId: string;
  countryId: string;
  achievementId: string;
}

const UserCountryAchievementSchema =
  new mongoose.Schema<UserCountryAchievement>({
    userId: { type: String, required: true },
    countryId: { type: String, required: true },
    achievementId: { type: String, required: true },
  });

export default mongoose.models.UserCountryAchievement ||
  mongoose.model("UserCountryAchievement", UserCountryAchievementSchema);
