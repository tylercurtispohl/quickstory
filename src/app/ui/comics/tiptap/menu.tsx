"use client";

import { Editor } from "@tiptap/react";
import { Button } from "@nextui-org/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChatBubbleLeftIcon,
  DocumentIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useCustomCommands } from "./useCustomCommands";

export const ComicEditorMenu = ({ editor }: { editor: Editor }) => {
  const {
    insertPanel,
    insertDialog,
    insertPage,
    logJson,
    logAnchorPos,
    insertDialogBefore,
  } = useCustomCommands(editor);

  return (
    <div className="flex flex-row justify-start gap-2 py-2">
      <Button color="default" size="sm" variant="ghost" onClick={insertPage}>
        <DocumentIcon className="h-6 w-6" />
      </Button>
      <Button color="default" size="sm" variant="ghost" onClick={insertPanel}>
        <SquaresPlusIcon className="h-6 w-6" />
      </Button>
      <Button
        color="default"
        size="sm"
        variant="ghost"
        onClick={insertDialogBefore}
      >
        <ChatBubbleLeftIcon className="h-6 w-6" />
        <ArrowUpIcon className="h-4 w-4" />
      </Button>
      <Button color="default" size="sm" variant="ghost" onClick={insertDialog}>
        <ChatBubbleLeftIcon className="h-6 w-6" />
        <ArrowDownIcon className="h-4 w-4" />
      </Button>
      <Button color="default" size="sm" variant="ghost" onClick={logJson}>
        Log JSON
      </Button>
      <Button color="default" size="sm" variant="ghost" onClick={logAnchorPos}>
        Log AnchorPos
      </Button>
    </div>
  );
};