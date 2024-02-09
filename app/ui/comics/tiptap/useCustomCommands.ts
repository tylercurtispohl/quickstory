import { Editor } from "@tiptap/react";

export const useCustomCommands = (editor: Editor) => {
  return {
    insertPage: () => insertPage(editor),
    insertPanel: () => insertPanel(editor),
    insertDialog: () => insertDialog(editor),
    logJson: () => logJson(editor),
  };
};

const insertPage = (editor: Editor) =>
  editor.chain().focus().enter().enter().insertContent("<h1>Page X</h1>").run();

const insertPanel = (editor: Editor) =>
  editor
    .chain()
    .focus()
    .enter()
    .enter()
    .insertContent("<h2>Panel X</h2>")
    .run();

const insertDialog = (editor: Editor) =>
  editor
    .chain()
    .focus()
    .enter()
    .enter()
    .insertContent({
      type: "charactername",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "Character Name",
        },
      ],
    })
    .selectNodeBackward()
    .selectTextblockStart()
    .run();

const logJson = (editor: Editor) => console.log(editor.getJSON());
