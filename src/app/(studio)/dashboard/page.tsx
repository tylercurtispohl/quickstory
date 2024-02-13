import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { TestGetUser } from "@/src/app/ui/testGetUser";

export default async function Page() {
  const user = await currentUser();
  return (
    <>
      <div>Hi {user?.username}</div>
      <div>
        <Link href="/comics">Comic Studio</Link>
      </div>
      <TestGetUser></TestGetUser>
    </>
  );
}
