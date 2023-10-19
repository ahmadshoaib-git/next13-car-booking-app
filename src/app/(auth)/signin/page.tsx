import SignInForm from '@/components/modules/Form/signIn';

const SignIn = () => {
    return (
        <main className="w-[100%] h-[100vh] flex justify-center items-center">
            <div className="shadow-sm border rounded-lg max-w-[20rem] w-full p-[1.5rem]">
                <h2 className="text-center uppercase pb-[1rem]">Sign In</h2>
                <SignInForm />
            </div>
        </main>
    );
};

export default SignIn;

