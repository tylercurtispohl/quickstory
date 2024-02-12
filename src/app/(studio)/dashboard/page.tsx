"use client";

import { PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Amplify } from "aws-amplify";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "@/src/amplifyconfiguration.json";
import { Button } from "@nextui-org/react";
Amplify.configure(config);

export default withAuthenticator(function Page({
  signOut,
  user,
}: WithAuthenticatorProps) {
  return (
    <>
      <div>Hello, {user?.username}</div>
      <div>
        <Link href="/comics">Comic Studio</Link>
      </div>
      <Button onClick={signOut}>
        <PowerIcon className="h-12 w-12" />
        Sign Out
      </Button>
    </>
  );
},
{});
