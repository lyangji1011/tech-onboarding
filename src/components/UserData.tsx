import React, { useEffect, useState } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import { SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import UserCard from "./UserCard";

const UserData: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

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

      const URL = "https://users.api.hexlabs.org/users/hexlabs";
      const response = await axios.get(apiUrl(Service.USERS, URL), {
        params: {
          limit: 10,
        },
      });
      // const temp = await axios.get(apiUrl(Service.HEXATHONS, URL));
      // console.log(temp);
      // limit doesn't work

      setUsers(response?.data);
    };
    document.title = "Hexlabs Users";
    getUsers();
  }, []);

  // TODO: Create a function that sorts the users array based on the first name of the users. Then, create a button that
  // calls this function and sorts the users alphabetically by first name. You can use the built in sort() function to do this.

  return (
    <>
      <SimpleGrid columns={[2, 3, 5]} spacing={6} padding={10}>
        {/* Here we are mapping every entry in our users array to a unique UserCard component, each with the unique respective
        data of each unique user in our array. This is a really important concept that we use a lot so be sure to familiarize
        yourself with the syntax - compartmentalizing code makes your work so much more readable. */}
        {users.map((user) => (
          <UserCard user={user} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default UserData;
