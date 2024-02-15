"use client";

import { Editor } from "@tiptap/react";
import { Button, Chip, Input, Spinner } from "@nextui-org/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChatBubbleLeftIcon,
  CheckIcon,
  DocumentIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useCustomCommands } from "./useCustomCommands";
import { Doc } from "@prisma/client";

export const ComicEditorMenu = ({
  editor,
  doc,
  isDirty,
  setIsDirty,
}: {
  editor: Editor;
  doc: Doc;
  isDirty: boolean;
  setIsDirty: (value: boolean) => void;
}) => {
  const {
    insertPanel,
    insertDialog,
    insertPage,
    logJson,
    logAnchorPos,
    insertDialogBefore,
  } = useCustomCommands(editor);

  const [docName, setDocName] = useState(doc.name);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <>
      <div>
        <Input
          value={docName}
          onValueChange={(value) => {
            setDocName(value);
            setIsDirty(true);
          }}
          variant="underlined"
          size="lg"
          // className="text-3xl font-semibold"
          classNames={{
            input: ["text-3xl", "font-semibold"],
          }}
        />
      </div>
      <div className="flex flex-row justify-start gap-2 py-2 flex-wrap">
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
        <Button
          color="default"
          size="sm"
          variant="ghost"
          onClick={insertDialog}
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
          <ArrowDownIcon className="h-4 w-4" />
        </Button>
        <Button color="default" size="sm" variant="ghost" onClick={logJson}>
          Log JSON
        </Button>
        <Button
          color="default"
          size="sm"
          variant="ghost"
          onClick={logAnchorPos}
        >
          Log AnchorPos
        </Button>
        <Button
          color="default"
          size="sm"
          variant="ghost"
          onClick={async () => {
            setIsSaving(true);
            const json = JSON.stringify(editor.getJSON());

            // TODO: Handle errors
            await fetch(`/api/docs/comic/upload/${doc.id}`, {
              method: "POST",
              body: json,
            });

            await fetch(`/api/docs/update`, {
              method: "POST",
              body: JSON.stringify({
                id: doc.id,
                name: docName,
              }),
            });

            setIsDirty(false);
            setIsSaving(false);
          }}
        >
          Save
        </Button>
        <Button
          color="default"
          size="sm"
          variant="ghost"
          onClick={async () => {
            const json = JSON.stringify(editor.getJSON());

            const response = await fetch("/api/docs/comics/retrieve/test123");

            const body = await response.json();

            console.log(body);
          }}
        >
          Test Get
        </Button>
        <div>
          {isSaving ? (
            <Spinner size="sm" />
          ) : isDirty ? (
            <Chip color="danger">Not Saved</Chip>
          ) : (
            <Chip color="primary">
              <div className="flex flex-row gap-1">
                <CheckIcon className="h-4 w-4" /> Saved
              </div>
            </Chip>
          )}
        </div>
      </div>
    </>
  );
};
