import { ClerkProvider } from "@clerk/nextjs";
import "@/src/app/globals.css";
import { Nav } from "@/src/app/ui/nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Nav />
          <main className="flex flex-row justify-center text-gray-900">
            <div className="max-w-[1280px] w-full px-6">{children}</div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
