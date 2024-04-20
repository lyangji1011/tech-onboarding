import {
  Modal,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  hexathons: any[];
}

export default function HexathonModal({
  isOpen,
  onClose,
  user,
  hexathons,
}: Props) {
  const [applied, setApplied] = useState<any[]>([]);

  useEffect(() => {
    const findApplied = async () => {
      setApplied(
        hexathons.map((hexathon) => {
          return hexathon.applications.find(
            (app: any) => app.userId === user.userId
          );
        })
      );
    };

    findApplied();
  }, []);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader marginBottom="0px" paddingBottom="0px">
            Applications
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text marginBottom={5}>
              {user.name.first} {user.name.last}
            </Text>
            <UnorderedList>
              {applied.map((hexathon) => {
                return <ListItem>{hexathon.name}</ListItem>;
              })}
            </UnorderedList>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </div>
  );
}
