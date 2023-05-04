import React from 'react';
import Image from 'next/image';
import kozoLogo from "../public/assets/kozoLogo.svg"
import Link from 'next/link';
const Header = () => {
    return (
        <header>
            <div className='m-10 ml-10'>
            <Image src={kozoLogo} className='w-40 p-3' alt='logo'/>
            </div>
        </header>
    );
}

export default Header;
