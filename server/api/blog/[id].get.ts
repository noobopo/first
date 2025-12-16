import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { id } = event.context.params! as { id: string }

    const blog = await blogSchema.findById(id).populate({
      path: "user"
    })
    if (!blog) {
      return createError({
        statusCode: 404,
        statusMessage: "blog not found!"
      })
    }
    return {
      blog
    }
  } catch (error) {
    console.log(error);
  }
});
