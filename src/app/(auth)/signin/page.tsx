import Image from 'next/image';
import { RefreshCcw } from 'lucide-react';
import SignInForm from '@/components/modules/Form/signIn';
import Particle from '@/components/modules/Particles/index';
import Link from 'next/link';

const SignIn = () => {
    return (
        <main className="relative w-[100%] h-[100vh] grid grid-cols-2 items-center">
            {/* <div className="absolute right-0 top-0 h-full w-full z-[1]"> */}
            <div className="relative h-full">
                <Image src={'/bg-dark.jpg'} alt="Metaverse" fill className={'!absolute h-full'} />
                <div className="absolute z-[3]">
                    <Particle />
                </div>
            </div>
            <div className="h-full w-full flex items-center justify-center">
                <div className="flex-col items-center justify-center">
                    <div className="shadow-sm border rounded-lg max-w-[20rem] w-full p-[1.5rem] z-[2] bg-slate-100/[.6]">
                        <h2 className="text-center uppercase pb-[1rem] font-semibold">Sign In</h2>
                        <SignInForm />
                    </div>
                    <div className="mt-[1rem]">
                        <p className="text-md font-normal leading-6">
                            Dont have account?{' '}
                            <Link href="/signup" className="font-semibold text-slate-800 hover:underline">
                                Click here
                            </Link>{' '}
                            to register.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignIn;

