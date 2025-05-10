import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/firebase";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { onAuthStateChanged, type User } from "firebase/auth";

function waitForAuth(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export const Route = createFileRoute("/_admin")({
  loader: async () => {
    const user = await waitForAuth();
    if (!user) {
      throw redirect({ to: "/auth/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate({ to: "/auth/login" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 p-1 flex items-center gap-2 bg-[#f0f0f0]">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="font-bold text-lg">
            Porte.
          </Link>
          <Link to="/notes" className="[&.active]:font-bold">
            Notes
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <Link to="/setting" className="[&.active]:font-bold">
            Setting
          </Link>
        </nav>
        <div className="ml-auto">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuItem>Feedback</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 hover:text-red-700"
                  onClick={handleLogout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!user && (
            <Link
              to="/auth/login"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              <Button size="sm">Log in</Button>
            </Link>
          )}
        </div>
      </header>
      <main className="flex-1 px-4">
        <Outlet />
      </main>
      <footer className="p-2 text-sm text-center">
        <p className="text-gray-500 hover:text-gray-700">
          Made with ❤️ by
          <span className="font-bold text-gray-800"> Porte.</span>
        </p>
      </footer>
    </div>
  );
}
