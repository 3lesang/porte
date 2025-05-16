import ContentSection from "@/components/content-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ContentSection title="Post"></ContentSection>;
}
