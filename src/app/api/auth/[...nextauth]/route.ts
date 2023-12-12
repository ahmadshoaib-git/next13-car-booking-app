// import NextAuth from 'next-auth';
// import { Account, User as AuthUser } from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcrypt';
// import { GeneralService } from '@/services/generalServices';
// import { getFirstLastName } from '@/lib/helpers';
// // import User from "@/models/User";
// // import connect from "@/utils/db";

// export const authOptions: any = {
//     // Configure one or more authentication providers
//     providers: [
//         CredentialsProvider({
//             id: 'credentials',
//             name: 'Credentials',
//             credentials: {
//                 firstName: { label: 'FirstName', type: 'text' },
//                 lastName: { label: 'LastName', type: 'text' },
//                 email: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' },
//             },
//             async authorize(credentials: any) {
//                 // await connect();
//                 try {
//                     // if (await GeneralService.CheckUserExists(credentials.email)) return NextResponse.json({ error: `User with email '${email}' already exists` }, { status: 400 });
//                     //   const user = await User.findOne({ email: credentials.email });
//                     if (user) {
//                         const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
//                         if (isPasswordCorrect) {
//                             return user;
//                         }
//                     }
//                 } catch (err: any) {
//                     throw new Error(err);
//                 }
//             },
//         }),
//         GithubProvider({
//             clientId: process.env.GITHUB_ID ?? '',
//             clientSecret: process.env.GITHUB_SECRET ?? '',
//         }),
//         // ...add more providers here
//     ],
//     callbacks: {
//         async signIn({ user, account }: { user: AuthUser; account: Account }) {
//             if (account?.provider == 'credentials') {
//                 return true;
//             }
//             if (account?.provider == 'github') {
//                 // await connect();
//                 try {
//                     const existingUser = GeneralService.CheckUserExists(user.email || '');
//                     if (!existingUser) {
//                         const UserObj = {
//                             email: user.email || '',
//                             firstName: getFirstLastName(user.name || '', 0),
//                             lastName: getFirstLastName(user.name || '', 1),
//                         };
//                         const newUser = await GeneralService.createUserSSO(UserObj);
//                         return true;
//                     }
//                     return true;
//                 } catch (err) {
//                     console.log('Error saving user', err);
//                     return false;
//                 }
//             }
//         },
//     },
// };

// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

