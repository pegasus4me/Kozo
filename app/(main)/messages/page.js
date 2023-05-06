"use client";

import React from "react";
import { useSession, getSession } from "next-auth/react";
import Button from "@/components/button";
const Page = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Button name= "login to get access" path="/login"/>;
  }
  return (
    <div>
    </div>
  );
};

export default Page;
