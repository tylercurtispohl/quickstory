"use client";

import { Button } from "@nextui-org/react";
import { DocType } from "@/src/app/lib/types";
import { useRouter } from "next/navigation";
import { getDocBodyPlaceholder } from "../../lib/placeholderData";

export const CreateNewDocButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="light"
      onClick={async () => {
        const createDocBody = JSON.stringify({
          name: "Untitled",
          description: "",
          docType: DocType.COMIC,
        });

        const createDocResponse = await fetch("/api/docs/create", {
          method: "POST",
          body: createDocBody,
        });

        const newDoc = await createDocResponse.json();

        const uploadDocBody = getDocBodyPlaceholder();

        const uploadJsonResponse = await fetch(
          `/api/docs/comic/upload/${newDoc.id}`,
          {
            method: "POST",
            body: uploadDocBody,
          }
        );

        router.push(`/comics/${newDoc.id}`);
      }}
    >
      Create New Comic
    </Button>
  );
};
