




// jobs/unbanJob.ts
import cron from "node-cron";
import { userModel } from "../modules/user/user.model";

 

export const startUnbanJob = () => {
 
  cron.schedule("0 * * * *", async () => {
    const now = new Date();

    try {
      const result = await userModel.updateMany(
        { status: "banned", banExpiresAt: { $lte: now } },
        { $set: { status: "approved", banExpiresAt: null } },
        {new:true, runValidators: true, context: 'query'}
      );

      if (result.modifiedCount > 0) {
        console.log(`✅ ${result.modifiedCount} user(s) auto unbanned`);
      }
    } catch (error) {
      console.error("❌ Error running auto-unban job:", error);
    }
  });
};
