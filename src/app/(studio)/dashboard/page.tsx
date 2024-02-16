import { currentUser } from "@clerk/nextjs";
import { getDocsByUserId } from "@/src/app/lib/actions";
import { DocList } from "@/src/app/ui/dashboard/docList";
import { sortBy } from "lodash";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - QuickStory Studio",
  description:
    "Your QuickStory dashboard where you can find all of your stories",
};

export default async function Page() {
  const user = await currentUser();

  // TODO: handle this error with a custom error page
  if (!user) return <div>Error - user not found</div>;

  const docs = await getDocsByUserId(user.id);

  const sortedDocs = sortBy(docs, (d) => d.updatedAt).reverse();

  return (
    <>
      <DocList docs={sortedDocs}></DocList>
    </>
  );
}
