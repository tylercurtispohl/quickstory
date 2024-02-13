import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/app/globals.css";
import "@aws-amplify/ui-react/styles.css";
import { AuthenticatorLayout } from "@/src/app/ui/authenticator/authenticatorLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickStory Studio",
  description: "QuickStory Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthenticatorLayout>{children}</AuthenticatorLayout>
      </body>
    </html>
  );
}
