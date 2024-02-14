import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { CreateNewDocButton } from "@/src/app/ui/comics/createNewDocButton";

export default async function Page() {
  const user = await currentUser();

  return (
    <>
      <div>Hi {user?.username}</div>
      <div>
        <CreateNewDocButton></CreateNewDocButton>
      </div>
      <div>
        <Link href="/comics">Comic Studio</Link>
      </div>
    </>
  );
}
