import { Button } from "@/components/ui/button";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 p-1 flex items-center gap-2 bg-[#f0f0f0]">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="font-bold text-lg">
            Porte.
          </Link>

          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </nav>
        <div className="ml-auto">
          <Link
            to="/auth/login"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            <Button size="sm" >
              Log in
            </Button>
          </Link>
        </div>
      </header>
      <div className="mt-10" />
      <Outlet />
    </div>
  );
}
