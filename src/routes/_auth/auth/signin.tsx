import SignInForm from "@/components/form/SignInForm";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/auth/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full lg:max-w-72 flex-1  flex flex-col gap-2 justify-center mx-auto px-8 lg:px-0">
      <h1 className="text-2xl font-bold">Log In</h1>
      <p className="text-sm text-gray-500">
        Log in to your account to continue.
      </p>
      <SignInForm />
      <p className="text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
