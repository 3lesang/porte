import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

export type SignUpFormType = z.infer<typeof schema>;

interface ISignUpForm {
  onSubmit?: (values: SignUpFormType) => void;
}

function SignUpForm({ onSubmit }: ISignUpForm) {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: SignUpFormType) => {
    onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <Input placeholder="" {...field} />
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
              <Label>Password</Label>
              <Input type="password" placeholder="" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
