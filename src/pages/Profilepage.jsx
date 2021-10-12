import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Profilepage() {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <Heading>Profile page</Heading>
      <Card maxW="md" mx="auto" mt={4}>
        {currentUser.providerData.map((data, index) => (
          <div key={index}>
            <img alt="Kamil" src={data.photoURL} />
            <Text>Photo: {data.photoURL}</Text>
            <Text>Display Name: {data.displayName}</Text>
            <Text>Email: {data.email}</Text>
            <Text>Phone Number: {data.phoneNumber}</Text>
          </div>
        ))}
      </Card>
    </Layout>
  );
}
