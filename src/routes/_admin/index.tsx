import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <p className="text-gray-600">
        This is the admin page. You can manage your notes and settings here.
      </p>
    </div>
  );
}
