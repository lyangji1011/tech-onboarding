import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalFooter,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function UserModal({ isOpen, onClose, user }: Props) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {user.name.first} {user.name.last}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{user.email}</Text>
            <Text>{user.phoneNumber}</Text>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </div>
  );
}
