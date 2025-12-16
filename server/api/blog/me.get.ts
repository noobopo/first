import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const userId = event.context.userId as string
    const blogs  = await blogSchema.find({ user: userId })
    return {
      message : "your posted blogs: ",
      blogs
    }
  } catch (error) {
    console.log(error);
  }
});
