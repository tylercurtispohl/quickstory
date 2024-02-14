// VERCEL BLOB STORAGE CODE
// import { put } from "@vercel/blob";

// export const POST = async (
//   request: Request,
//   { params }: { params: { docId: string } }
// ) => {
//   if (!request.body) throw new Error("Body cannot be empty");

//   const { docId } = params;

//   const blob = await put(`${docId}.json`, request.body, {
//     access: "public",
//   });

//   return Response.json(blob);
// };

// END VERCEL BLOB STORAGE CODE

// AWS S3 STORAGE CODE
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromUtf8 } from "@aws-sdk/util-utf8-node";

export const POST = async (
  request: Request,
  { params }: { params: { docId: string; docType: string } }
) => {
  if (!request.body) throw new Error("Body cannot be empty");

  const { docId, docType } = params;

  const s3Key = `${docType}/${docId}.json`;

  const requestBody = await request.text();

  const payload = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: s3Key,
    ContentType: "application/json",
    Body: fromUtf8(requestBody),
  };

  const s3Client = new S3Client({
    region: process.env.AWS_REGION ?? "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    },
  });

  const command = new PutObjectCommand(payload);

  await s3Client.send(command);

  return Response.json({
    message: "File uploaded successfully",
    data: {
      key: s3Key,
    },
  });
};
