"use client";
import { ComicEditor } from "@/app/ui/comics/tiptap/editor";

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="w-3/4">
        <ComicEditor />
      </div>
    </div>
  );
}
