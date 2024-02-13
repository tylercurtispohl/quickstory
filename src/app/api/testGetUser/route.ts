import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export const GET = async (request: Request) => {
  const user: User | null = await currentUser();

  if (user === null) {
    throw new Error("User not found");
  }

  console.log(user);

  return Response.json(user);
};
