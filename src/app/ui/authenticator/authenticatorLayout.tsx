"use client";

import { PowerIcon } from "@heroicons/react/24/outline";
import "@/src/app/globals.css";
import { Providers } from "@/src/app/providers";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import config from "@/src/amplifyconfiguration.json";
import { Button } from "@nextui-org/react";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(config, { ssr: true });

export const AuthenticatorLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Authenticator hideSignUp={true}>
      {({ signOut, user }) => (
        <Providers>
          {children}
          <Button onClick={signOut}>
            <PowerIcon className="h-12 w-12" />
            Sign Out
          </Button>
        </Providers>
      )}
    </Authenticator>
  );
};
