import { H3Event } from 'h3'

interface UpdateData {
  name?: string,
  password?: string,
  isActive?: boolean
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody<UpdateData>(event)!
    const { name, password, isActive } = body;

    const userId = event.context.userId;
    const updatedData : UpdateData = {};

    if (name) {
      updatedData.name = name;
    }
    if (password) {
      return {
        message: "you con`t change password from this route",
      };
    }
    if (isActive) {
      updatedData.isActive = isActive;
    }
    const user = await userSchema.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    return {
      message: "data updated!",
      user,
    };
  } catch (error) {
    console.log(error);
  }
});
