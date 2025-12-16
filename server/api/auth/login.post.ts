import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { H3Event } from 'h3'

interface IloginData {
  email: string,
  password: string
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const config = useRuntimeConfig()
    const body = await readBody<IloginData>(event);
    const { email, password } = body
    
    if (!email || !password) {
      return {
        success: false,
        message: "All filds are requred!"
      }
    }

    //find user from database
    let user = await userSchema.findOne({ email });
    if (!user) {
      return {
        success: false,
        message: "user not found!"
      }
    }

    // compare user body password and database password
    const isMatch : boolean = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return {
        success: false,
        message: "wrong email or password!"
      }
    }

    //creating jwt token
    const token = jwt.sign({ id : user._id.toString() }, config.JWT_SECRET, { expiresIn: "1d" })

    return {
      success: true,
      message: `Welcome back ${user.name}`,
      token
    }

  } catch (error) {
    console.log(error);
  }
});
