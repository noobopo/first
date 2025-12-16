import {H3Event} from 'h3'
export default defineEventHandler(async (event : H3Event) => {
  try {
    const { id } = event.context.params as {id : string}
    // console.log( id);
    
    const user = await userSchema.findById(id);
    if (!user) {
      return {
        message: "user not found!",
      };
    }
    await userSchema.findByIdAndDelete(id);
    return {
      message: "user deleted!",
    };
  } catch (error) {
    return {
      message: error,
    };
  }
});
