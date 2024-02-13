import { NextRequest, NextResponse } from "next/server";
import config from "@/src/amplifyconfiguration.json";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { getCurrentUser } from "aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("Test GET");

  const user = await runWithAmplifyServerContext({
    nextServerContext: { request: req, response: res },
    operation: (contextSpec) => getCurrentUser(contextSpec),
  });

  console.log(user);

  return Response.json({ status: "OK" });
}
