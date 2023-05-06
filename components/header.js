"use client";
import React from "react";
import Image from "next/image";
import kozoLogo from "../public/assets/kozoLogo.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center">
      <div className="m-10 ml-10">
        <Image src={kozoLogo} className="w-40 p-3" alt="logo" />
      </div>
      {status === "authenticated" ? (
        <div className="mr-10 flex items-center ">
          <span class="relative flex h-3 w-3 mr-5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <div>
          <h2 className="text-sm font-medium text-gray-900">connected as : <span className="text-gray-500">{session.user.email}</span></h2>
          <p className="text-xs font-medium text-gray-900"> statut : <span className="text-green-500">{status}</span></p>
          </div>
          
        </div>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
