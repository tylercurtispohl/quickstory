import { PrismaConnector } from "@/src/lib/prismaConnector";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const DELETE = async (
  req: Request,
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

  const command = new DeleteObjectCommand(payload);

  await s3Client.send(command);

  await PrismaConnector.getClient().doc.delete({
    where: {
      id: docId,
    },
  });

  return new Response(null, {
    status: 200,
  });
};
