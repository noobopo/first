import bcrypt from "bcrypt";
import { userSchema } from "../../models/user";
import { H3Event } from "h3";

interface IregisterBody {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody<IregisterBody>(event);
    const { name, email, password, isActive } = body;
    if (!name || !email || !password) {
      return {
        success: false,
        message: "all fields are required!"
      }
    }
    //find user in database if it already exist
    const user = await userSchema.findOne({ email });
    if (user) {
      return {
        success: false,
        message: "user already exist!",
      };
    }

    //hashing the password
    const hasePass = await bcrypt.hash(password, 10);

    //Register the user to the database
    await userSchema.create({ name, email, password: hasePass, isActive });
    return {
      success: true,
      status: 200,
      message: "user register successfully!",
    };
  } catch (error) {
    console.log(error);
  }
});
