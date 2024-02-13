import { getCurrentUser } from "aws-amplify/auth";
import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";

Amplify.configure(config, { ssr: true });

// This doesn't work - see src/app/api/test/route.ts instead
// Leaving it here to come back and try again
export const getAuthenticatedUser = async () => {
  const { username, userId, signInDetails } = await getCurrentUser();

  return { username, userId, signInDetails };
};
