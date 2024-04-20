import React, { useEffect, useState } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import { Box, Button, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import UserCard from "./UserCard";

const UserData: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [users470, setUsers470] = useState<any[]>([]);

  const [hexathons, setHexathons] = useState<any[]>([]); // stores hexathon ids

  useEffect(() => {
    // This is an example of an async function. The async keyword tells the
    // function to wait for the axios request to finish before continuing. This
    // is useful because we can't use the data from the request until it is
    // finished.

    const getUsers = async () => {
      // TODO: Use the apiUrl() function to make a request to the /users endpoint of our USERS service. The first argument is the URL
      // of the request, which is created for the hexlabs api through our custom function apiUrl(), which builds the request URL based on
      // the Service enum and the following specific endpoint URL.

      // TODO: Also explore some of the other ways to configure the api call such as filtering and pagination.
      // Try to filter all the users with phone numbers starting with 470 or increase the amount of users returned from the default 50 (don't go above 100).

      const URL = "/users/hexlabs";
      const response = await axios.get(apiUrl(Service.USERS, URL), {
        params: {
          limit: 10,
        },
      });

      setUsers(response?.data);

      setUsers470(
        response.data.filter((user: any) => {
          return user.phoneNumber?.startsWith("470");
        })
      );
    };
    document.title = "Hexlabs Users";
    getUsers();

    const getHexathons = async () => {
      const response = await axios.get(apiUrl(Service.HEXATHONS, "/hexathons"));
      console.log(response.data);
      setHexathons(
        response.data.filter((hexathon: any) => {
          return hexathon.id;
        })
      );
    };
    getHexathons();
  }, []);

  function shuffle(temp: any[]) {
    const array = [...temp];
    let currentIndex = array.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <>
      <Flex padding={10}>
        <Button
          onClick={() => {
            setUsers470(
              [...users470].sort((a, b) =>
                a.name.first.localeCompare(b.name.first)
              )
            );
          }}
        >
          Sort by first name
        </Button>
        <Button
          marginLeft={4}
          onClick={() => {
            setUsers470(shuffle(users470));
          }}
          _hover={{
            bgGradient: "linear(to-r, #34bdeb, #7765f0)",
            color: "white",
          }}
        >
          Shuffle
        </Button>
      </Flex>
      <SimpleGrid
        columns={[2, 3, 3, 4, 5]}
        spacing={6}
        paddingBottom={10}
        paddingX={10}
      >
        {/* Here we are mapping every entry in our users array to a unique UserCard component, each with the unique respective
        data of each unique user in our array. This is a really important concept that we use a lot so be sure to familiarize
        yourself with the syntax - compartmentalizing code makes your work so much more readable. */}
        {users470.map((user) => (
          <UserCard user={user} hexathons={hexathons} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default UserData;
