import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";

export const Route = createFileRoute("/_auth/auth/login")({
  component: RouteComponent,
});

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email is required",
  }),
  password: z.string().min(2, {
    message: "Password is required",
  }),
});

function ProfileForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setPersistence(auth, browserLocalPersistence);
    signInWithEmailAndPassword(auth, values.email, values.password);
    navigate({ to: "/" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your email address. It will be used to login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className="w-full">
          Log In
        </Button>
      </form>
    </Form>
  );
}

function RouteComponent() {
  return (
    <div className="w-full lg:max-w-72 h-96  flex flex-col gap-2 justify-center mx-auto px-8 lg:px-0">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <ProfileForm />
    </div>
  );
}
