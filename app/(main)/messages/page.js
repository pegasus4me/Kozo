"use client";

import React from "react";
import { useSession, getSession } from "next-auth/react";
import Button from "@/components/button";
import Container from "@/components/Container";
import RoomContainer from "@/components/roomContainer";
import Popup from "@/components/popup";
const Page = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Button name="login to get access" path="/login" />;
  }
  return (
    <div>
      
      <Container>
        <RoomContainer>

        </RoomContainer>
      </Container>
      
      

      <Popup/>
    </div>
  );
};

export default Page;
