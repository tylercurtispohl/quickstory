// "use client";

// import { PowerIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import { Amplify } from "aws-amplify";
// import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
// import { withAuthenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import config from "@/src/amplifyconfiguration.json";
// import { Button } from "@nextui-org/react";
// Amplify.configure(config);

// export default withAuthenticator(function Page({
//   signOut,
//   user,
// }: WithAuthenticatorProps) {
//   return (
//     <>
//       <div>Hello, {user?.username}</div>
//       <div>
//         <Link href="/comics">Comic Studio</Link>
//       </div>
//       <Button onClick={signOut}>
//         <PowerIcon className="h-12 w-12" />
//         Sign Out
//       </Button>
//     </>
//   );
// },
// {});

import { signOut } from "@/src/auth";
import { PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div>
        <Link href="/comics">Comic Studio</Link>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </>
  );
}
