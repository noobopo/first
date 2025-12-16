import { PutObjectCommand } from "@aws-sdk/client-s3";
import { createSpacesClient } from "../../utils/spaces";
import { H3Event, MultiPartData } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();
  const spaces = createSpacesClient();
  const userId: string = event.context.userId;

  const data = (await readMultipartFormData(event)) as MultiPartData[] | null

  const title = data?.find(i => i.name === "title")?.data?.toString()
  const description = data?.find(i => i.name === "description")?.data?.toString()
  const image = data?.find(i => i.name === "image")

  if (!title || !description || !image?.filename || !image?.data) {
    throw createError({ statusCode: 400, statusMessage: "All fields are required!" });
  }

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

  const post = await blogSchema.create({
    title,
    description,
    imageUrl,
    user: userId,
  });

  setResponseStatus(event, 201)
  return { success: true, message: "New blog created!", post };
});
