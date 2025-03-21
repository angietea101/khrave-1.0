"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import styles from "@/app/styles/LoginRegisterForm.module.css";

const FormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .refine((val) => /^[a-zA-Z0-9_]+$/.test(val), {
      message: "Invalid username",
    }),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const loginData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    if (loginData?.error) {
      toast({
        title: "Error",
        description: "Oops! Something went wrong.",
        variant: "destructive",
      });
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.wrapper}>
          <h1 className="">log in</h1>
          <form
            className={styles.form}
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className={styles.inputBox}>
              <input
                {...form.register("username")}
                type="text"
                placeholder="username"
                required
              ></input>
              <p className={styles.errorText}>
                {form.formState.errors.username?.message}
              </p>
            </div>

            <div className={styles.inputBox}>
              <input
                {...form.register("password")}
                type="password"
                placeholder="password"
                required
              ></input>
              <p className={styles.errorText}>
                {form.formState.errors.password?.message}
              </p>
            </div>

            <button className={styles.buttonSubmit} type="submit" value="login">
              log in
            </button>

            <div className={styles.linkWrapper}>
              <p>Don&apos;t have an account?</p>
              <Link className={styles.linkDecoration} href="/register">
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
