import { H3Event } from 'h3'
import { Iuser } from '~~/server/models/user';
export default defineEventHandler(async (event : H3Event) => {
  try {
    const userId = event.context.userId;
    if (!userId) {
      return {
        success: false,
        message: "Invalid user id"
      }
    }
    const user = await userSchema.findById<Iuser>(userId).select("-password");
    console.log(user);
    
    return {
      success: true,
      user
    };
  } catch (error) {
    console.log(error);
  }
});
