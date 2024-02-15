import { currentUser } from "@clerk/nextjs";
import { CreateNewDocButton } from "@/src/app/ui/comics/createNewDocButton";
import { getDocsByUserId } from "@/src/app/lib/actions";
import { DocList } from "@/src/app/ui/dashboard/docList";

export default async function Page() {
  const user = await currentUser();

  // TODO: handle this error with a custom error page
  if (!user) return <div>Error - user not found</div>;

  const docs = await getDocsByUserId(user.id);

  return (
    <>
      <DocList docs={docs}></DocList>
    </>
  );
}
