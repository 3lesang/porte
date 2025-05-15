import ContentSection from "@/components/content-section";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { InfoIcon, SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/_admin/setting/_setting")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();
  const items = [
    { href: "/setting", title: "General", icon: <SettingsIcon /> },
    { href: "/setting/about", title: "About", icon: <InfoIcon /> },
  ];

  return (
    <ContentSection title="Setting" desc="Setting page">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
            <ScrollArea
              type="always"
              className="hidden w-full min-w-40 py-2 md:block"
            >
              <nav
                className={cn(
                  "flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0"
                )}
              >
                {items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      pathname === item.href
                        ? "bg-muted hover:bg-muted"
                        : "hover:bg-transparent hover:underline",
                      "justify-start"
                    )}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </div>
          <div className="col-span-8">
            <Outlet />
          </div>
        </div>
      </div>
    </ContentSection>
  );
}
