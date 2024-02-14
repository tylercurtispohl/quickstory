"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import React from "react";
import {
  CharacterName,
  ComicDocument,
  Dialog,
  Page,
  PageDescription,
  PageHeading,
  Panel,
  PanelDescription,
  PanelDialog,
  PanelHeading,
} from "@/src/app/ui/comics/tiptap/schema";
import { ComicEditorMenu } from "@/src/app/ui/comics/tiptap/menu";
import { Doc } from "@prisma/client";

export const ComicEditor = ({
  content,
  doc,
}: {
  content: JSONContent;
  doc: Doc;
}) => {
  const editor = useEditor({
    extensions: [
      ComicDocument,
      Page,
      PageHeading.configure({
        HTMLAttributes: { class: "text-2xl font-semibold mb-2" },
      }),
      PageDescription,
      Paragraph,
      Text,
      Panel,
      PanelHeading.configure({
        HTMLAttributes: {
          class: "text-xl font-semibold underline underline-offset-1",
        },
      }),
      PanelDescription,
      PanelDialog,
      CharacterName.configure({
        HTMLAttributes: { class: "text-lg font-medium text-center" },
      }),
      Dialog.configure({ HTMLAttributes: { class: "text-center" } }),
    ],

    // content:
    //   "<h1>Page 1</h1><h2>Panel 1</h2><p>Panel Description<p><h3>Bob</h3><p>Some Dialog<p>",
    content: content,

    // `
    // <h1>Page 1</h1>
    // <div class="panel">
    //   <h2>Panel 1</h2>
    //   <div class="panel-description">
    //     <p>asdjfiowe</p>
    //   </div>
    //   <div class="panel-dialog">
    //     <h3>Character Name</h3>
    //     <p>some dialog</p>
    //   </div>
    // </div>
    // `,
  });

  return (
    <>
      {editor && <ComicEditorMenu editor={editor} doc={doc} />}
      <EditorContent editor={editor} className="mt-2" />
    </>
  );
};
