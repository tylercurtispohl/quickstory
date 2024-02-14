import { PrismaConnector } from "@/src/lib/prismaConnector";
import { v4 as uuidV4 } from "uuid";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export const POST = async (req: Request) => {
  try {
    const user: User | null = await currentUser();

    if (user === null) throw new Error("User not found");

    const { name, description, docType } = await req.json();

    const doc = await PrismaConnector.getClient().doc.create({
      data: {
        clerkUserId: user.id,
        name,
        description,
        docType,
      },
    });

    return Response.json(doc, { status: 200 });
  } catch (error) {
    console.log("[POST DOC]", error);
    return Response.error();
  }
};
