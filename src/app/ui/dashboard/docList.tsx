"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Doc } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDocBodyPlaceholder } from "@/src/app/lib/placeholderData";
import { DocType } from "@/src/app/lib/types";
import { DateTime } from "luxon";

export const DocList = ({ docs }: { docs: Doc[] }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card
        shadow="sm"
        isHoverable
        isPressable
        onPress={async () => {
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
        <CardBody>
          <div className="flex flex-row">
            <PlusIcon className="h-6 w-6 mr-2" />
            Create New Comic
          </div>
        </CardBody>
      </Card>
      {docs.map((doc) => {
        // return (
        //   <Link key={`doc_link_${doc.id}`} href={`/comics/${doc.id}`}>
        //     {doc.name}
        //   </Link>
        // );
        return (
          <Card
            key={`doc_card_${doc.id}`}
            shadow="sm"
            radius="md"
            isHoverable
            isPressable
            onPress={() => {
              router.push(`/comics/${doc.id}`);
            }}
            classNames={{
              body: ["h-16", "overflow-hidden"],
            }}
          >
            <CardBody>{doc.name}</CardBody>
            <CardFooter>
              <div className="w-full flex justify-between">
                <p>Updated:</p>
                <p>
                  {DateTime.fromISO(doc.updatedAt.toISOString()).toLocaleString(
                    DateTime.DATETIME_SHORT
                  )}
                </p>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
