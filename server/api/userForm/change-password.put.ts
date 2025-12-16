import bcrypt from "bcrypt";
import { H3Event } from 'h3'

interface Ipassword {
  password: string,
  newPassword: string
}
export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody<Ipassword>(event);
    const { password, newPassword } = body;
    if (!password || !newPassword) {
      return{
        success: false,
        message: "All filds are reuired!"
      }
    }
    if (password === newPassword) {
      return {
        success: false,
        message: "new and old password should not be same!",
      };
    }
    const userId = event.context.userId;
    // console.log("user id",userId);
    
    const user = await userSchema.findById(userId);
    if (!user) {
      return {
        success: false,
        message: "user not found!",
      };
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: "wrong old password!",
      };
    }
    const hasePass = await bcrypt.hash(newPassword, 10);
    await userSchema.findByIdAndUpdate(
      userId,
      { password: hasePass },
      { new: true }
    );
    return {
      success: true,
      message: "new password saved!",
    };
  } catch (error) {
    console.log(error);
  }
});
