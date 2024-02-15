import { UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full flex justify-end flex-row p-6">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="w-full px-6">{children}</div>
    </>
  );
}
