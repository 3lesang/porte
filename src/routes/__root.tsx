import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import React from "react";

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <nav className="p-2 flex items-center gap-2 text-sm">
        <Link to="/" className="font-bold text-lg">
          Porte.
        </Link>

        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
      <footer className="p-2 text-sm text-center">
        <p className="text-gray-500 hover:text-gray-700">
          Made with ❤️ by
          <span className="font-bold text-gray-800"> Porte.</span>
        </p>
      </footer>
    </React.Fragment>
  ),
});
