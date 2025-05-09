import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-xl mx-auto p-4 text-justify">
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <p className="mb-4">
        This is the about page of the React application. It provides some
        information about the application and its purpose.
      </p>
      <p className="mb-4">
        The application is built using React, Vite, and TanStack Router. It
        leverages the power of these technologies to create a fast and
        efficient routing solution for React applications.
      </p>
      <p className="mb-4">
        TanStack Router is a powerful routing library that provides a simple and
        intuitive API for managing routes in React applications. It allows you to
        define routes using a file-based routing system, making it easy to
        organize and manage your application's routes.
      </p>
      <p className="mb-4">
        Vite is a fast and lightweight build tool that provides a great
        development experience for React applications. It offers features like
        hot module replacement, fast builds, and a simple configuration
        process, making it an excellent choice for modern web development.
      </p>
      <p>
        This is a simple example of a React application using TanStack Router
        and Vite. The application consists of two routes: the home page and the
        about page. The home page contains a button, and the about page contains
        some text.
      </p>
    </div>
  );
}
