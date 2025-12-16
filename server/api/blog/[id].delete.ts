import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { H3Error, H3Event } from 'h3';
import { createSpacesClient } from '../../utils/spaces'

export default defineEventHandler(async (event : H3Event) => {
  try {
    const config = useRuntimeConfig();
    const spaces = createSpacesClient();

    const { id } = event.context.params! as { id: string };

    const blog = await blogSchema.findById(id)
    const userId = event.context.userId as string

    if (blog?.user.toString() !== userId) {
      return createError({
        statusCode: 401,
        statusMessage: "you can`t delete this blog!"
      }) as H3Error
    }
    const oldKey = blog?.imageUrl.toString().split(".com/")[1];
    await spaces.send(
      new DeleteObjectCommand({
        Bucket: config.S3_BUCKET,
        Key: oldKey,
      })
    );
    await blogSchema.findByIdAndDelete(id)
    return {
      statusCode: 200,
      statusMessage: "blog deleted"
    }
  } catch (error) {
    console.log(error);
  }
});
