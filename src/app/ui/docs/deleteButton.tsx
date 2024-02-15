"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DeleteButton = ({
  docId,
  fullWidth,
  radius,
  goToPath,
  iconOnly,
}: {
  docId: string;
  fullWidth?: boolean | undefined;
  radius?: "none" | "sm" | "md" | "lg" | undefined;
  goToPath?: string | undefined;
  iconOnly?: boolean | undefined;
}) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        variant="light"
        color="danger"
        startContent={<TrashIcon className="h-6 w-6" />}
        fullWidth={fullWidth}
        radius={radius}
        onPress={onOpen}
      >
        {!iconOnly && "Delete"}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure?!
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this story? This action cannot
                  be undone!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  startContent={
                    isDeleting ? (
                      <Spinner size="sm" color="danger" />
                    ) : (
                      <TrashIcon className="h-6 w-6" />
                    )
                  }
                  onPress={async () => {
                    setIsDeleting(true);
                    await fetch(`/api/docs/comic/delete/${docId}`, {
                      method: "DELETE",
                    });
                    goToPath && router.push(goToPath);
                    router.refresh();
                    onClose();
                    setIsDeleting(false);
                  }}
                >
                  Yes, delete this story
                </Button>
                <Button color="danger" onPress={onClose}>
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
