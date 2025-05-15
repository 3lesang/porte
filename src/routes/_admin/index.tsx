import ContentSection from "@/components/content-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentSection
      title="Admin"
      desc=" This is the admin page. You can manage your notes and settings here."
    />
  );
}
