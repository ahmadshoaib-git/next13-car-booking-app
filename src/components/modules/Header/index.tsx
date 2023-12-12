'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ButtonSun from './buttonSun/index';
import ButtonMoon from './buttonMoon/index';
import LinkedAccount from './linkedAccount/index';
import { styles } from '../../styles/index';
import Logo from '../Logo/index';

const menuLinks = [
    { name: 'Home', url: '/' },
    { name: 'History', url: '/history' },
    { name: 'Help', url: '/help' },
    { name: 'Contact', url: '/contact' },
];

const Header = () => {
    let [open, setOpen] = React.useState(false);
    let [darkMode, setDarkMode] = React.useState(true);

    const toggleOpen = () => setOpen(!open);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    const linkClasses = 'border-b border-transparent ml-10 text-md text-smoke capitalize hover:border-b hover:border-grey-300';
    return (
        <header>
            <div className="flex justify-center">
                <nav className={`sticky top-0 w-full h-20 shadow-md z-[100] bg-black px-[1rem]`}>
                    <div className="flex justify-between items-center w-full h-full px-4 2xl:px-16 py-10">
                        <Link href="/" className="text-">
                            <Logo />
                        </Link>
                        <div>
                            <ul className="hidden md:flex items-center">
                                {menuLinks.map((mLink, index) => {
                                    return (
                                        <li key={index.toString()} className={linkClasses}>
                                            <Link href={mLink.url}>{mLink.name}</Link>
                                        </li>
                                    );
                                })}
                                {/* <li className=" ml-10">{darkMode ? <ButtonSun onClick={toggleDarkMode} /> : <ButtonMoon onClick={toggleDarkMode} />}</li> */}
                            </ul>
                            {/** Mobile Nav Icon*/}
                            <div onClick={toggleOpen} className="md:hidden text-lg text-smoke cursor-pointer">
                                <Menu />
                            </div>
                        </div>
                    </div>
                    {/** Mobile Nav */}
                    <div className={`${open ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70' : 'md:hidden'}`}>
                        <div
                            className={`${
                                open
                                    ? 'fixed left-0 top-0 w-full h-screen bg-black px-10 py-6 ease-in duration-300'
                                    : 'fixed left-[-100%] top-0 p-10 ease-in duration-300'
                            }`}
                        >
                            <div className="flex w-full items-center justify-between">
                                <Link href="/">
                                    <Image
                                        src="/logo_ahmadshoaib.png"
                                        alt="outcome"
                                        fill
                                        className="max-w-[2rem] min-w-[2rem] max-h-[2rem] min-h-[2rem] !static group-hover:sectionImageAnimation2"
                                    />
                                </Link>
                                <div onClick={toggleOpen} className="text-smoke cursor-pointer">
                                    <X />
                                </div>
                            </div>
                            <div className="border-b border-blue my-5">
                                <p className="w-[85%] md:w-[90%] py-4"> Ahmad Shoaib | Software Development Consultant</p>
                            </div>
                            <div className="py-4 flex flex-col">
                                <ul className="uppercase">
                                    {/* <li className="py-4">
                                        <Link href={'/'}>Home</Link>
                                    </li>
                                    <li className="py-4">
                                        <Link href={'/'}>About</Link>
                                    </li>
                                    <li className="py-4">
                                        <Link href={'/'}>Projects</Link>
                                    </li>
                                    <li className="py-4">
                                        <Link href={'/'}>Contact</Link>
                                    </li> */}
                                    {menuLinks.map((mLink, index) => {
                                        return (
                                            <li key={index.toString()} className="py-4">
                                                <Link href={mLink.url} onClick={toggleOpen}>
                                                    {mLink.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="w-full absolute bottom-0 flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center my-4 w-full">
                                        <LinkedAccount url="www.facebook.com">
                                            <i data-lucide="facebook"></i>
                                        </LinkedAccount>
                                        <LinkedAccount url="www.facebook.com">
                                            <i data-lucide="facebook"></i>
                                        </LinkedAccount>
                                        <LinkedAccount url="www.facebook.com">
                                            <i data-lucide="facebook"></i>
                                        </LinkedAccount>
                                        <LinkedAccount url="www.facebook.com">
                                            <i data-lucide="facebook"></i>
                                        </LinkedAccount>
                                    </div>
                                    <div className="text-blue">© 2023 Ahmad Shoaib. All rights reserved.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;

