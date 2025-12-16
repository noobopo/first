import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { createSpacesClient } from "../../utils/spaces";
import { H3Event, MultiPartData } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const config = useRuntimeConfig();
    const spaces = createSpacesClient();
    const userId = event.context.userId;
    const { id } = event.context.params as { id: string }

    const blog = await blogSchema.findById(id)
    if (!blog) {
      return createError({
        statusCode: 404,
        statusMessage: "blog not found!"
      })
    }
    if (blog.user.toString() !== userId) {
      return createError({
        statusCode: 401,
        statusMessage: "you can`t update this blog!"
      })
    }
    const data = (await readMultipartFormData(event)) as MultiPartData[] | null
    // console.log('Data: ', data);

    type Tupdate = {
      title?: string,
      description?: string,
      imageUrl?: string
    }
    const updatedDetails: Tupdate = {}

    const title = data?.find((e: any) => e.name === "title")?.data?.toString();
    if (title) {
      updatedDetails.title = title
    }

    const description = data?.find((e: any) => e?.name === "description")?.data?.toString();
    if (description) {
      updatedDetails.description = description
    }

    const image = data?.find((e: any) => e?.name === "image");

    if (image) {
      const oldKey = blog.imageUrl.toString().split(".com/")[1];
      await spaces.send(
        new DeleteObjectCommand({
          Bucket: config.S3_BUCKET,
          Key: oldKey,
        })
      );

      const fileName = `${Date.now()}-${image.filename}`;

      await spaces.send(
        new PutObjectCommand({
          Bucket: config.S3_BUCKET,
          Key: `uploads/${fileName}`,
          Body: image.data,
          ACL: "public-read",
          ContentType: image.type || "image/jpeg",
        })
      );

      const imageUrl = `https://${config.S3_BUCKET}.${config.S3_REGION}.digitaloceanspaces.com/uploads/${fileName}`;

      updatedDetails.imageUrl = imageUrl
    }
    const newBlog = await blogSchema.findByIdAndUpdate(id, updatedDetails, { new: true })
    return {
      statusMessage: "blog updated!",
      newBlog
    }
  } catch (error) {
    console.log(error);
  }
});
