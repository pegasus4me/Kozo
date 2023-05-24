"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session, status } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-4xl">
        <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><span class="text-black '>
          The ultimate messaging chat{" "}
          <span className="text-green-400">build by users for users</span>
        </h1>
        <button className="text-white bg-green-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-blue-800">
          {status === "unauthenticated" ? (
            <Link href="/login">get started!</Link>
          ) : (
            <Link href="/messages">get started!</Link>
          )}
        </button>
      </div>
    </main>
  );
}
