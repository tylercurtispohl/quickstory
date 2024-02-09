"use client";

import { Editor } from "@tiptap/react";
import { Button } from "@nextui-org/react";
import {
  ChatBubbleLeftIcon,
  DocumentIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useCustomCommands } from "./useCustomCommands";

export const ComicEditorMenu = ({ editor }: { editor: Editor }) => {
  const { insertPanel, insertDialog, insertPage, logJson } =
    useCustomCommands(editor);

  return (
    <div className="flex flex-row justify-start gap-2 py-2">
      <Button color="default" size="sm" variant="light" onClick={insertPage}>
        <DocumentIcon className="h-6 w-6" />
      </Button>
      <Button color="default" size="sm" variant="light" onClick={insertPanel}>
        <SquaresPlusIcon className="h-6 w-6" />
      </Button>
      <Button color="default" size="sm" variant="light" onClick={insertDialog}>
        <ChatBubbleLeftIcon className="h-6 w-6" />
      </Button>
      <Button color="default" size="sm" variant="light" onClick={logJson}>
        Log JSON
      </Button>
    </div>
  );
};
