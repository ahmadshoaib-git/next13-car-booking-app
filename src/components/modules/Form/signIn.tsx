'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    email: z.string().min(2, {
        message: 'Email must be at least 2 characters.',
    }),
    password: z.string().min(5, {
        message: 'Password must be at least 5 characters.',
    }),
});

const SignInForm = () => {
    const [loader, setLoader] = React.useState(false);
    const { replace } = useRouter();
    const form: any = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values);
        setLoader(true);
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
        });
        if (response.statusText === 'OK') {
            // toast.success(`User verified and logged in successfully!`);
            replace('/');
        }
        setLoader(false);
        console.log({ response });
    };
    return (
        <>
            <Form autoComplete="off" {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex-col gap-[3rem]">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-[100%] mt-[1rem]">
                        <span className="mr-[0.25rem]">Submit</span>
                        <span className="text-white">{loader && <RefreshCcw className="text-2xl rotate-circular-sm" />}</span>
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default SignInForm;

