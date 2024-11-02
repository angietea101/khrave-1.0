"use client"

import React from 'react'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


// Define the schema with Zod
const formSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: "Username must be at least 5 characters." })
      .max(15, { message: "Username can't be longer than 15 characters." }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email.")
      .max(300, { message: "Email can't be longer than 300 characters." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Must be at least 6 characters" }),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

type FormSchemaType = z.infer<typeof formSchema>

const RegisterForm: React.FC = () => {
    const router = useRouter();
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch('/api/user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password
            })
        })

        if (response.ok) {
            router.push('/login')
        } else {
            console.log("Registration failed.")
        }
    }

    return (
        <div className="center font-nunito_sans">
          <div className="wrapper">
            <h1 className="">
              register
            </h1>
            <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="input-box">
                <input
                  {...form.register('username')}
                  id="username"
                  type="text"
                  placeholder="username" 
                >
                </input>
                <p className="error-text">
                  {form.formState.errors.username?.message}
                </p>
              </div>

              <div className="input-box">
                <input
                  {...form.register('email')}
                  id="email"
                  type="email"
                  placeholder="email" 
                >
                </input>
                <p className="error-text">
                  {form.formState.errors.email?.message}
                </p>
              </div>

              <div className="input-box">
                <input
                  {...form.register('password')}
                  id="password"
                  type="password"
                  placeholder="password" 
                >
                </input>
                <p className="error-text">
                  {form.formState.errors.password?.message}
                </p>
              </div>

              <div className="input-box">
                <input
                  {...form.register('confirmPassword')}
                  id="confirmPassword"
                  type="password"
                  placeholder="confirm password" 
                >
                </input>
                <p className="error-text">
                  {form.formState.errors.confirmPassword?.message}
                </p>
              </div>

              <button className="login-button" type="submit">
                register
              </button>

              <div className="register-link">
                <p>Already have an account?</p>
                  <Link className="link-decoration" href="/login">
                      Log in
                  </Link>
              </div>
            </form>
          </div>
      </div>
    );    
}

export default RegisterForm
