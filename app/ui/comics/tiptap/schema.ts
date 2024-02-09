import Document from "@tiptap/extension-document";
import { Node } from "@tiptap/core";
import Heading, { Level } from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";

const getHtmlAttributesWithClassName = (
  HTMLAttributes: Record<string, any>,
  className: string
) => {
  const classes = `${HTMLAttributes.class ?? ""} ${className}`;
  return { ...HTMLAttributes, class: classes };
};

export const ComicDocument = Document.extend({
  name: "ComicDocument",
  content: "page+",
  topNode: true,
});

export const Page = Node.create({
  name: "page",
  group: "page",
  content: "pageheading panel+",
  renderHTML({ HTMLAttributes }) {
    return ["div", getHtmlAttributesWithClassName(HTMLAttributes, "page"), 0];
  },
});

export const PageHeading = Heading.extend({
  name: "pageheading",
  group: "pageheading",
  addOptions() {
    return {
      ...this.parent?.(),
      levels: [1] as Level[],
    };
  },
});

export const PageDescription = Paragraph.extend({
  name: "pagedescription",
  group: "pagedescription",
});

export const Panel = Node.create({
  name: "panel",
  group: "panel",
  content: "panelheading paneldescription paneldialog*",
  renderHTML({ HTMLAttributes }) {
    return ["div", getHtmlAttributesWithClassName(HTMLAttributes, "panel"), 0];
  },
});

export const PanelHeading = Heading.extend({
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

export const PanelDescription = Node.create({
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

export const PanelDialog = Node.create({
  name: "paneldialog",
  group: "paneldialog",
  content: "(charactername dialog+)+",
  // content: "block+",
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      getHtmlAttributesWithClassName(HTMLAttributes, "panel-dialog"),
      0,
    ];
  },
});

export const CharacterName = Heading.extend({
  name: "charactername",
  group: "charactername",
  addOptions() {
    return {
      ...this.parent?.(),
      levels: [3] as Level[],
    };
  },
});

export const Dialog = Paragraph.extend({
  name: "dialog",
  group: "dialog",
  // content: "inline*",
});
