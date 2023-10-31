'use client';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Logout = () => {
    const [loader, setLoader] = React.useState(false);
    const { replace } = useRouter();
    const handleLogout = async () => {
        setLoader(true);
        const response = await fetch('/api/auth/logout', {
            method: 'GET',
        });
        if (response.statusText === 'OK') {
            // toast.success(`User verified and logged in successfully!`);
            replace('/signin');
        }
        setLoader(false);
        console.log({ response });
    };
    return (
        <Button onClick={handleLogout} className="w-[10%] mt-[1rem] min-w-[6rem]">
            <span className="mr-[0.25rem]">Logout</span>
            <span className="text-white">{loader && <RefreshCcw className="text-2xl rotate-circular-sm" />}</span>
        </Button>
    );
};

export default Logout;

