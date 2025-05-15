import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold max-w-xl mx-auto">Setting</h1>
      <p className="text-gray-500 max-w-xl mx-auto">
        This is the setting page.
      </p>
    </div>
  );
}
