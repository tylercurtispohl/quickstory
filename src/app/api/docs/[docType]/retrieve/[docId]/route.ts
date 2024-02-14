import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const GET = async (
  request: Request,
  { params }: { params: { docId: string; docType: string } }
) => {
  const { docId, docType } = params;

  const s3Key = `${docType}/${docId}.json`;

  const payload = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: s3Key,
    ContentType: "application/json",
  };

  const s3Client = new S3Client({
    region: process.env.AWS_REGION ?? "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    },
  });

  const command = new GetObjectCommand(payload);

  const data = await s3Client.send(command);

  const bodyString = await data.Body?.transformToString("utf8");

  if (!bodyString)
    return Response.json(
      { message: "Error reading document" },
      { status: 500 }
    );

  const body = JSON.parse(bodyString);

  return Response.json(body);
};
