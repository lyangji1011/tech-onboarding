import { Box, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import UserModal from "./UserModal";
import { InfoIcon } from "@chakra-ui/icons";
import HexathonModal from "./HexathonModal";

type Props = {
  user: any;
  hexathons: any[];
};

// TODO: right now, the UserCard only displays the user's name and email. Create a new modal component <UserModal> that
// pops up when the card is clicked. In this modal, list all the user's information including name, email, phoneNumber,
// and userId.

// TODO: Explore if you can display the email as a link to the user's email that will open up the user's
// email client and start a new email to that user. Also explore if you can provide a link to the user's resume.

// TODO: In our database structure, every user has a userId that is unique to them. This is the primary key of the user
// and is referenced in their applications to all of our hexathons. Create a button that when clicked, will retrieve all of
// the hexathons that the user has applied to. You can use the /applications endpoint of the registration service to do this
// and the /hexathons endpoint of the hexathons service to get a list of all the hexathons.

const UserCard: React.FC<Props> = (props: Props) => {
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const {
    isOpen: isHexathonOpen,
    onOpen: onHexathonOpen,
    onClose: onHexathonClose,
  } = useDisclosure();

  const openHexathonModal = () => {
    onHexathonOpen();
  };

  const openProfile = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
  };

  return (
    <div>
      <Box
        borderWidth="1px"
        rounded="lg"
        boxShadow="lg"
        height="175px"
        fontWeight="bold"
        alignItems="center"
        padding="10px"
        onClick={(e) => openProfile(e)}
        _hover={{ cursor: "pointer" }}
      >
        <Flex h="100%" flexDirection="column" justify="space-between">
          <Flex padding="2" flexDirection="column">
            <HStack align="flex-end" justify="space-between">
              <Text fontSize="xl">{`${props.user.name.first} ${props.user.name.last}`}</Text>
            </HStack>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              justifyContent="justify"
              mt="2"
            >
              {props.user.email}
            </Text>
          </Flex>
          <HStack marginLeft={2} marginBottom={2}>
            <InfoIcon
              onClick={openHexathonModal}
              color="gray.600"
              _hover={{ color: "cyan.600", cursor: "pointer" }}
            />
          </HStack>
        </Flex>
      </Box>
      <HexathonModal
        isOpen={isHexathonOpen}
        onClose={onHexathonClose}
        user={props.user}
        hexathons={props.hexathons}
      />
      <UserModal
        isOpen={isProfileOpen}
        onClose={onProfileClose}
        user={props.user}
      />
    </div>
  );
};

export default UserCard;
