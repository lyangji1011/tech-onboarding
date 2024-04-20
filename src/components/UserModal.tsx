import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalFooter,
  Tooltip,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function UserModal({ isOpen, onClose, user }: Props) {
  const openEmail = () => {
    window.open(`mailto:${user.email}`);
  };

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
            <Tooltip label={`Email ${user.name.first}`}>
              <Text
                onClick={openEmail}
                _hover={{ color: "cyan.600", cursor: "pointer" }}
              >
                {user.email}
              </Text>
            </Tooltip>
            <Text>{user.phoneNumber}</Text>
            <Text>ID: {user.userId}</Text>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </div>
  );
}
