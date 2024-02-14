import { PrismaConnector } from "@/src/lib/prismaConnector";

export const POST = async (req: Request) => {
  const { id, name } = await req.json();

  const updatedDoc = await PrismaConnector.getClient().doc.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  return Response.json(updatedDoc, { status: 200 });
};
