import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Select,
  SelectItem,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Progress,
  Snippet,
} from "@nextui-org/react";



function DetailCard({ isOpen, onClose, name, episods }) {
  const episodeNumbers = Array.from(
    { length: episods },
    (_, index) => `Episode ${index + 1}`
  );

  const [valeurSelectionnee, setValeurSelectionnee] = useState("");

  const handleChange = (valeur) => {
    setValeurSelectionnee(valeur);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="top-center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{name}</ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Select
                  label="Episode"
                  className="max-w-xs"
                  value={valeurSelectionnee}
                  onChange={handleChange}
                >
                  {episodeNumbers.map((episode) => (
                    <SelectItem key={episode} value={episode}>
                      {episode}
                    </SelectItem>
                  ))}
                </Select>
                <Checkbox defaultSelected color="success">
                  Fini
                </Checkbox>
              </div>

              <Input type="lien" variant="bordered" label="Lien" />
              <Progress
                aria-label="Loading..."
                value={60}
                className="max-w-md"
              />
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Link href="#">Default Link</Link>
                <Snippet>Lien</Snippet>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button>
                ❤️
              </Button>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
export default DetailCard;
