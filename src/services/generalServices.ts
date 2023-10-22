import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';

interface NewUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export class GeneralService {
    static async CheckUserExists(email: string) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (user?.email) return true;
            return false;
        } catch (error) {
            console.error('Error calling API:', error);
            // throw error;
            return false;
        }
    }
    static async createUser(user: NewUser) {
        try {
            const salt = await bcrypt.genSalt(10); //genSalt will create a salt with the 10 rounds - Salt is a cryptographically secure random string that is added to a password before it's hashed,
            const hashedPass = await bcrypt.hash(user.password, salt);
            const tempUser = { ...user };
            tempUser.password = hashedPass;
            const newUser = await prisma.user.create({
                data: tempUser,
            });
            return newUser;
        } catch (error) {
            console.log('========================================= >>>>>> createUser ');
            console.error('Error executing SQL query:', error);
            throw error;
        }
    }
}

