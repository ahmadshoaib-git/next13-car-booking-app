import { userValidator } from '@/components/modules/Form/signIn.validation';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const isValid = userValidator.safeParse({ email, password });
        console.log(isValid);
        if (!isValid.success) return NextResponse.json({ error: isValid.error.issues[0].message }, { status: 400 });
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (err) {
        console.log({ err });
        return NextResponse.json({ message: { err } }, { status: 500 });
    }
}

