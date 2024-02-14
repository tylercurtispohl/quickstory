import { getDoc, getDocBody } from "@/src/app/lib/actions";
import { DocType } from "@/src/app/lib/types";
import { ComicEditor } from "@/src/app/ui/comics/tiptap/editor";

export default async function Page({ params }: { params: { docId: string } }) {
  const doc = await getDoc(params.docId);

  // TODO: Redirect to a 404 page or back to the dashboard
  if (!doc) {
    return <div>Uh oh - doc not found!</div>;
  }

  const docBody = await getDocBody(doc.docType as DocType, doc.id);

  return (
    <div className="flex justify-center">
      <div className="w-3/4">
        <ComicEditor content={docBody} doc={doc} />
      </div>
    </div>
  );
}
