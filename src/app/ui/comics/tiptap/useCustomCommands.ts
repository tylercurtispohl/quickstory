import { Editor, NodePos } from "@tiptap/react";

export const useCustomCommands = (editor: Editor) => {
  return {
    insertPage: () => insertPage(editor),
    insertPanel: () => insertPanel(editor),
    insertDialog: () => insertDialog(editor),
    insertDialogBefore: () => insertDialogBefore(editor),
    logJson: () => logJson(editor),
    logAnchorPos: () => logAnchorPos(editor),
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

const insertDialog = (editor: Editor) => {
  const anchorPos = editor.$pos(editor.state.selection.anchor);
  console.log("anchor pos");
  console.log(anchorPos);
  // const nodePos = new NodePos(anchorPos, editor);
  const closestDialog = anchorPos.closest("paneldialog");
  console.log("closest paneldialog pos");
  console.log(closestDialog);
  console.log(closestDialog?.parent);

  return editor
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
};

const insertDialogBefore = (editor: Editor) => {
  const anchorPos = editor.$pos(editor.state.selection.anchor);
  const currentNode = anchorPos.node;
  // if current pos is in panel dialog (either character name or dialog)
  //    insert content before closest charactername
  // if current pos is in panel heading or description
  //    if there is a previous panel
  //        insert content at end of previous panel
  // if current pos is in page heading or page description
  //    if there is a previous page
  //        insert content at end of previous page
  let pos: NodePos | null | undefined;
  if (currentNode.type.name === "charactername") {
    pos = anchorPos.before;
  }

  if (!pos) {
    return false;
  }

  return editor
    .chain()
    .focus()
    .insertContentAt(anchorPos, [
      {
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
      },
      {
        type: "dialog",
        content: [
          {
            type: "text",
            text: "Dialog",
          },
        ],
      },
    ]);
};

const logJson = (editor: Editor) => console.log(editor.getJSON());

const logAnchorPos = (editor: Editor) => {
  const anchorPos = editor.$pos(editor.state.selection.anchor);
  console.log("anchorPos");
  console.log(anchorPos);
  console.log("before");
  console.log(anchorPos.before);
  console.log("node");
  console.log(anchorPos.node);
  console.log("content");
  console.log(anchorPos.content);
  console.log("lastChild");
  console.log(anchorPos.lastChild);
};
