"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import { Button } from "@nextui-org/react";
import { DocumentIcon } from "@heroicons/react/24/outline";

export const ComicEditorMenu = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex flex-row justify-start gap-2">
      <Button
        color="default"
        size="sm"
        // onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}

        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <DocumentIcon className="h-6 w-6" />
      </Button>
    </div>
  );
};

export const ComicEditor = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
    ],

    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <>
      {editor && <ComicEditorMenu editor={editor} />}
      <EditorContent editor={editor} />
    </>
  );
};
