import React from "react";
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure,
    Input,
} from "@nextui-org/react";

export default function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button color="primary" href="#" variant="flat" onPress={onOpen}>Recherche</Button>
      <Modal hideCloseButton="true" backdrop="blur" placement="top" size="5xl"  isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
              <Input color="primary" type="email" variant="bordered" />
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button fullWidth="true" color="primary" variant="flat" onPress={onClose}>
                Recherche
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
