import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_setting/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="">Setting</div>;
}
