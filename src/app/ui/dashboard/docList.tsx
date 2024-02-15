"use client";
import {
  ArrowTopRightOnSquareIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";
import { Doc } from "@prisma/client";
import { useRouter } from "next/navigation";
import { getDocBodyPlaceholder } from "@/src/app/lib/placeholderData";
import { DocType } from "@/src/app/lib/types";
import { DateTime } from "luxon";
import { useState } from "react";
import { DeleteButton } from "@/src/app/ui/docs/deleteButton";

export const DocList = ({ docs }: { docs: Doc[] }) => {
  const router = useRouter();

  const goToDoc = (docId: string) => {
    router.push(`/comics/${docId}`);
  };

  const [isCreatingNewDoc, setIsCreatingNewDoc] = useState(false);

  const createNewDoc = async () => {
    setIsCreatingNewDoc(true);
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
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card shadow="sm" isHoverable isPressable onPress={createNewDoc}>
        <CardHeader></CardHeader>
        <CardBody>
          <div className="flex flex-row">
            <PlusIcon className="h-6 w-6 mr-2" />
            Create New Comic
          </div>
          {isCreatingNewDoc && (
            <div className="w-full h-full mt-2 flex justify-center">
              <div className="flex flex-col justify-center">
                <Spinner color="primary" />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
      {docs.map((doc) => {
        return (
          <Card
            key={`doc_card_${doc.id}`}
            shadow="sm"
            radius="md"
            classNames={{
              base: ["group "],
              header: [
                "justify-end group-hover:cursor-pointer group-hover:bg-gray-100",
              ],
              body: [
                "pt-0 h-16 group-hover:cursor-pointer group-hover:bg-gray-100 tap-highlight-transparent ",
              ],
              footer: ["flex justify-between"],
            }}
          >
            <CardHeader onClick={() => goToDoc(doc.id)}>
              <ArrowTopRightOnSquareIcon className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardBody onClick={() => goToDoc(doc.id)}>
              <div className="line-clamp-2">{doc.name}</div>
            </CardBody>
            <CardFooter>
              <p>
                Updated{" "}
                {DateTime.fromISO(doc.updatedAt.toISOString()).toLocaleString(
                  DateTime.DATETIME_SHORT
                )}
              </p>
              <Popover
                placement="bottom"
                color="default"
                classNames={{
                  content: ["p-0"],
                }}
              >
                <PopoverTrigger>
                  <Button
                    color="primary"
                    variant="light"
                    startContent={<EllipsisVerticalIcon className="h-6 w-6" />}
                    size="sm"
                  ></Button>
                </PopoverTrigger>
                <PopoverContent>
                  <DeleteButton fullWidth radius="lg" docId={doc.id} />
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
