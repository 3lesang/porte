import ContentSection from "@/components/content-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentSection
      title="About"
      desc="This is the about page of the React application. It provides some
        information about the application and its purpose."
    ></ContentSection>
  );
}
