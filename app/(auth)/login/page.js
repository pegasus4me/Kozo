"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

const Page = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex  flex-col items-center justify-center  p-3 m-3 bg-white rounded-lg drop-shadow-md">
        <h4 className="text-3xl  p-10">
          You must <span className="font-medium">sign in to join</span>
        </h4>
        <div className=" mb-5 p-3 w-full">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            className=" w-full px-1 py-2.5 rounded-md border focus:ring-4 focus:ring-blue-300 focus:outline-none"
          />
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            className="  w-full px-1 py-2.5 rounded-md border focus:ring-4 focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <hr className="text-black"/>
        <div className="max-w-full ">
          <button class="text-white bg-green-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-24 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-blue-800">
            Login
          </button>
        </div>
        <p className="text-sm mt-5">
          Don't have an account? <span className="text-green-400"><Link href='/register'>signup</Link></span>
        </p>
      </div>
    </div>
  );
};

export default Page;
