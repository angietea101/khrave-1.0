"use client";

import Link from "next/link";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .refine((val) => /^[a-zA-Z0-9_]+$/.test(val), {
      message: "Invalid username",
    }),
  password: z
    .string()
    .min(1, 'Password is required')
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const loginData = await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    if (loginData?.error) {
      toast({
        title: "Error",
        description: "Oops! Something went wrong.",
        variant: "destructive"
      })
    } else {
      router.refresh();
      router.push('/'); 
    }
  };

  return (
    <>
      <div className="center font-nunito_sans">
          <div className="wrapper">
            <h1 className="">
              login
            </h1>
            <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="input-box">
                <input
                  {...form.register('username')}
                  type="text"
                  placeholder="username" required
                >
                </input>
                <p className="error-text">
                  {form.formState.errors.username?.message}
                </p>
              </div>

              <div className="input-box">
                <input
                  {...form.register('password')}
                  type="password"
                  placeholder="password" required
                >
                </input>
                <p className="error-text">
                  {form.formState.errors.password?.message}
                </p>
              </div>

              <button className="login-button" type="submit" value="login">
                login
              </button>

              <div className="register-link">
                <p>Don't have an account?</p>
                  <Link className="link-decoration" href="/register">
                      Register
                  </Link>
              </div>
            </form>
          </div>
      </div>
    </>
  );
};

export default LoginForm;