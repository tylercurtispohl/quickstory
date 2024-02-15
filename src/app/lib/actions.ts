"use server";
import { PrismaConnector } from "@/src/lib/prismaConnector";
import { DocType, DocTypeToKeyPrefix } from "@/src/app/lib/types";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { JSONContent } from "@tiptap/react";

export const getDoc = async (id: string) =>
  PrismaConnector.getClient().doc.findUnique({
    where: {
      id,
    },
  });

export const getDocBody = async (
  docType: DocType,
  docId: string
): Promise<JSONContent> => {
  const keyPrefix = DocTypeToKeyPrefix[docType];

  const s3Key = `${keyPrefix}/${docId}.json`;

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

  if (!bodyString) {
    // TODO: Handle this more gracefully
    throw new Error("Error reading document");
  }

  const body = JSON.parse(bodyString);

  return body;
};

export const getDocsByUserId = async (userId: string) =>
  PrismaConnector.getClient().doc.findMany({
    where: {
      clerkUserId: userId,
    },
  });
