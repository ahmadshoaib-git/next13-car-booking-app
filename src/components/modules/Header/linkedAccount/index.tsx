import Link from 'next/link';
import React from 'react';

interface Props {
    url: string;
    children: React.ReactElement;
}

const LinkedAccount = ({ url, children }: Props) => {
    return (
        <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 hover:bg-grey">
            <Link href={url}>{children}</Link>
        </div>
    );
};

export default LinkedAccount;

