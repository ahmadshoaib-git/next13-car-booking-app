import Login from '@/components/custom/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24 gap-[1rem]">
            <Login />
        </main>
    );
}

