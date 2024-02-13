import { UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
