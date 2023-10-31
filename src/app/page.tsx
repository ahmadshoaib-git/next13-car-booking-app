import Logout from '@/components/modules/Form/logout';
import { prisma } from '../../lib/prisma';

export default async function Home() {
    const user = await prisma.user.findFirst({
        where: {
            email: 'abc@yopmail.com',
        },
    });

    return (
        <main className="flex min-h-screen flex-col items-center p-24 gap-[1rem]">
            <Logout />
        </main>
    );
}

