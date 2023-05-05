"use client";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import axios from "axios";

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = useCallback(async () => {
    try {
      let a = await axios.post("/api/user", {
        firstName,
        lastName,
        email,
        password,
      });
      const { createdAt } = a.data.data;

      if (createdAt !== null) {
        
      }
    } catch (error) {
      console.log(error);
    }
  }, [firstName, lastName, email, password]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex  flex-col items-center justify-center  p-3 m-3 bg-white rounded-lg drop-shadow-md">
        <h4 className="text-3xl  p-10">
          Welcome!<span className="font-medium"> register in to join</span>
        </h4>
        <div className=" mb-5 p-3 w-full">
          <label
            htmlFor="firstname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your firstname
          </label>
          <input
            type="text"
            className=" w-full px-1 py-2.5 rounded-md border mb-2 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
          <label
            htmlFor="lastname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your lastname
          </label>
          <input
            type="text"
            className=" w-full px-1 py-2.5 rounded-md mb-2 border  focus:ring-4 focus:ring-blue-300 focus:outline-none"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            className=" w-full px-1 py-2.5 rounded-md mb-2 border focus:ring-4 focus:ring-blue-300 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            className="  w-full px-1 py-2.5 rounded-md mb-2 border focus:ring-4 focus:ring-blue-300 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <hr className="text-black" />
        <div className="max-w-full ">
          <button
            className="text-white bg-green-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-24 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => registerUser()}
          >
            Register
          </button>
        </div>
        <p className="text-sm mt-5">
          already in the guild?{" "}
          <span className="text-green-400">
            <Link href="/login">login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Page;
