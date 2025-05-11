import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full lg:max-w-72 h-96  flex flex-col gap-2 justify-center mx-auto px-8 lg:px-0">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-500 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
