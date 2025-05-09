import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full  flex flex-col gap-2 justify-center items-center">
      <Button size="sm">click me</Button>
    </div>
  );
}
