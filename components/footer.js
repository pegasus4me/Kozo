"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import React from 'react';
import { HiLogout } from "react-icons/hi";

const Footer = () => {

    const { data: session, status } = useSession()
    return (
        <div className='bg-green-400 w-full h-6 fixed inset-x-0 bottom-0 flex justify-end items-center'>
            {status === 'authenticated' ? <div>
                <h4 className='mr-5' onClick={() => signOut({
                    redirect : true, 
                    callbackUrl : '/'
                })}><HiLogout className='text-black text-xl'/></h4>
            </div> : ""}
        </div>
    );
}

// 
export default Footer;
