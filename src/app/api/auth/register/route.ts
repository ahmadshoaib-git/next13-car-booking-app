import { userValidator } from '@/components/modules/Form/signIn.validation';
import { NextResponse } from 'next/server';
import { GeneralService } from '@/services/generalServices';

export async function POST(request: Request) {
    try {
        const { email, password, firstName, lastName } = await request.json();
        const isValid = userValidator.safeParse({ email, password });
        console.log(isValid);
        if (!isValid.success) return NextResponse.json({ error: isValid.error.issues[0].message }, { status: 400 });
        if (await GeneralService.CheckUserExists(email)) return NextResponse.json({ error: `User with email '${email}' already exists` }, { status: 400 });
        const newUser = await GeneralService.createUser({ email, password, firstName, lastName });
        return NextResponse.json({ message: 'success', user: newUser }, { status: 200 });
    } catch (err) {
        console.log({ err });
        return NextResponse.json({ message: { err } }, { status: 500 });
    }
}

