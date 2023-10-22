import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'abc@yopmail.com' },
        update: {},
        create: {
            email: 'abc@yopmail.com',
            firstName: 'ABC',
            lastName: 'User',
            password: '$2b$10$HcH1pj2pcIOadmCTBbyRFe97mucQd8vAIXpOYylNQamhuSzfw/eNi', // !Adbc1100
        },
    });
    console.log({ user });
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

// async function main() {
//     const user = prisma.user.upsert({
//         where: {
//             email: 'abc@yopmail.com',
//         },
//         update: {},
//         create: {
// email: 'abc@yopmail.com',
// firstName: 'ABC',
// lastName: 'User',
// password: '!Adbc1100',
//         },
//     });
//     console.log({ user });
// }

// main()
//     .then(() => {
//         prisma.$disconnect();
//     })
//     .catch(async (e) => {
//         console.log(e);
//         prisma.$disconnect();
//         process.exit(1);
//     });

