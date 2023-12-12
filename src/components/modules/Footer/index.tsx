import Link from 'next/link';
import React from 'react';
import { menuLinks } from '../../utils';
const Footer = () => {
    const linkClasses = 'border-b border-transparent ml-10 text-sm text-[#676767] capitalize hover:text-[#5774F6]';
    return (
        <footer className="mt-[6rem] mb-[3.75rem]">
            <ul className="flex justify-center gap-[2.75rem] list-none">
                {menuLinks.map((mLink, index) => {
                    return (
                        <li key={index.toString()} className={linkClasses}>
                            <Link href={mLink.url}>{mLink.name}</Link>
                        </li>
                    );
                })}
            </ul>
            <p className="mt-[1rem] font-Inter font-normal text-[#676767] text-[0.875rem] leading-[1.188rem] tracking-[0.01em] text-center">
                © 2023 All rights reserved by <span className="text-[#5774F6]">Ahmad Shoaib</span>
            </p>
        </footer>
    );
};

export default Footer;

