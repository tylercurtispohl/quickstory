"use client";

import {
  useEditor,
  EditorContent,
  Editor,
  useCurrentEditor,
  EditorProvider,
} from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading, { Level } from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import { Button } from "@nextui-org/react";
import {
  ChatBubbleLeftIcon,
  DocumentIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import ListItem from "@tiptap/extension-list-item";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Node } from "@tiptap/core";

export const ComicEditorMenu = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex flex-row justify-start gap-2">
      <Button
        color="default"
        size="sm"
        variant="light"
        onClick={() => {
          // console.log(editor.chain().focus().toggleHeading({ level: 1 }).run());
          editor
            .chain()
            .focus()
            .enter()
            .enter()
            .insertContent("<h1>Page X</h1>")
            .run();
        }}
      >
        <DocumentIcon className="h-6 w-6" />
      </Button>
      <Button
        color="default"
        size="sm"
        variant="light"
        onClick={() => {
          // console.log(editor.chain().focus().toggleHeading({ level: 2 }).run());
          editor
            .chain()
            .focus()
            .enter()
            .enter()
            .insertContent("<h2>Panel X</h2>")
            .run();
        }}
      >
        <SquaresPlusIcon className="h-6 w-6" />
      </Button>
      <Button
        color="default"
        size="sm"
        variant="light"
        onClick={() => {
          // console.log(editor.chain().focus().toggleHeading({ level: 3 }).run());
          editor
            .chain()
            .focus()
            .enter()
            .enter()
            .insertContent("<h3>Character Name</h3>")
            .enter()
            .run();
        }}
      >
        <ChatBubbleLeftIcon className="h-6 w-6" />
      </Button>
      <Button
        color="default"
        size="sm"
        variant="light"
        onClick={() => console.log(JSON.stringify(editor.getJSON()))}
      >
        Log JSON
      </Button>
    </div>
  );
};

const getHtmlAttributesWithClassName = (
  HTMLAttributes: Record<string, any>,
  className: string
) => {
  const classes = `${HTMLAttributes.class ?? ""} ${className}`;
  return { ...HTMLAttributes, class: classes };
};

const ComicDocument = Document.extend({
  name: "ComicDocument",
  content: "page+",
  topNode: true,
});

const Page = Node.create({
  name: "page",
  group: "page",
  content: "pageheading panel+",
  renderHTML({ HTMLAttributes }) {
    return ["div", getHtmlAttributesWithClassName(HTMLAttributes, "page"), 0];
  },
});

const PageHeading = Heading.extend({
  name: "pageheading",
  group: "pageheading",
  addOptions() {
    return {
      ...this.parent?.(),
      levels: [1] as Level[],
    };
  },
});

const PageDescription = Paragraph.extend({
  name: "pagedescription",
  group: "pagedescription",
});

const Panel = Node.create({
  name: "panel",
  group: "panel",
  content: "panelheading paneldescription paneldialog*",
  renderHTML({ HTMLAttributes }) {
    return ["div", getHtmlAttributesWithClassName(HTMLAttributes, "panel"), 0];
  },
});

const PanelHeading = Heading.extend({
  name: "panelheading",
  group: "panelheading",
  content: "inline*",
  addOptions() {
    return {
      ...this.parent?.(),
      levels: [2] as Level[],
    };
  },
});

const PanelDescription = Node.create({
  name: "paneldescription",
  group: "paneldescription",
  content: "paragraph+",
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      getHtmlAttributesWithClassName(HTMLAttributes, "panel-description"),
      0,
    ];
  },
});

const PanelDialog = Node.create({
  name: "paneldialog",
  group: "paneldialog",
  content: "(charactername dialog)+",
  // content: "block+",
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      getHtmlAttributesWithClassName(HTMLAttributes, "panel-dialog"),
      0,
    ];
  },
});

const CharacterName = Heading.extend({
  name: "charactername",
  group: "charactername",
  addOptions() {
    return {
      ...this.parent?.(),
      levels: [3] as Level[],
    };
  },
});

const Dialog = Paragraph.extend({
  name: "dialog",
  group: "dialog",
  // content: "inline*",
});

export const ComicEditor = () => {
  const editor = useEditor({
    extensions: [
      ComicDocument,
      Page,
      PageHeading.configure({
        HTMLAttributes: { class: "text-2xl font-semibold" },
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
    content:
      // "<h1>Page 1</h1><panel><h2>Panel 1</h2><p>Panel Description<p><h3>Bob</h3><p>Some Dialog<p></panel>",
      `
      <h1>Page 1</h1>
      <div class="panel">
        <h2>Panel 1</h2>
        <div class="panel-description">
          <p>asdjfiowe</p>
        </div>
        <div class="panel-dialog">
          <h3>Character Name</h3>
          <p>some dialog</p>
        </div>
      </div>
      `,
  });

  return (
    <>
      {editor && <ComicEditorMenu editor={editor} />}
      <EditorContent editor={editor} />
    </>
  );
};
