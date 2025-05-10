import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="p-2 text-sm text-center">
        <p className="text-gray-500 hover:text-gray-700">
          Made with ❤️ by
          <span className="font-bold text-gray-800"> Porte.</span>
        </p>
      </footer>
    </div>
  );
}
