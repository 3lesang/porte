import SignInForm, { type SignInFormType } from "@/components/form/SignInForm";
import SignUpForm from "@/components/form/SignUpForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/Auth";
import { pb, userCollectionId } from "@/pb";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ChevronDown, UserCircle } from "lucide-react";

function SignInDialog() {
  const { dialog, openDialog } = useAuth();
  const handleChange = (open: boolean) => {
    if (!open) {
      openDialog?.(undefined);
    }
  };

  const handleSubmit = async (values: SignInFormType) => {
    pb.collection(userCollectionId).authWithPassword(
      values.email,
      values.password
    );
    openDialog?.(undefined);
  };

  return (
    <Dialog open={dialog == "signin"} onOpenChange={handleChange}>
      <DialogContent className="w-sm">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Sign in to your account to continue.
          </DialogDescription>
        </DialogHeader>
        <SignInForm onSubmit={handleSubmit} />
        <DialogFooter className="sm:justify-start">
          <p className="text-sm text-gray-500">
            Don't have an account?
            <Button
              variant="link"
              className="px-1"
              onClick={() => openDialog?.("signup")}
            >
              Sign Up
            </Button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SignUpDialog() {
  const { dialog, openDialog } = useAuth();
  const handleChange = (open: boolean) => {
    if (!open) {
      openDialog?.(undefined);
    }
  };

  const handleSubmit = () => {
    openDialog?.(undefined);
  };

  return (
    <Dialog open={dialog == "signup"} onOpenChange={handleChange}>
      <DialogContent className="w-sm">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>
            Create an account to get started.
          </DialogDescription>
        </DialogHeader>
        <SignUpForm onSubmit={handleSubmit} />
        <DialogFooter className="sm:justify-start">
          <p className="text-sm text-gray-500">
            Already have an account?
            <Button
              variant="link"
              className="px-1"
              onClick={() => openDialog?.("signin")}
            >
              Sign In
            </Button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function UserMenu() {
  const user = pb.authStore.record;
  const handleLogout = () => {
    pb.authStore.clear();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="secondary">
          <UserCircle />
          <p>{user?.name}</p>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <Link to="/setting">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
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
  );
}

function AuthButton() {
  const { openDialog } = useAuth();
  const handleClick = () => {
    openDialog?.("signin");
  };
  return (
    <Button size="sm" onClick={handleClick}>
      Sign In
    </Button>
  );
}

export const Route = createFileRoute("/_admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const { logged } = useAuth();
  const items = [
    {
      href: "/notes",
      title: "Notes",
    },
    {
      href: "/posts",
      title: "Post",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 p-1 flex items-center gap-2 bg-[#f0f0f0]">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="font-bold text-lg">
            Porte.
          </Link>
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="[&.active]:font-bold"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">{logged ? <UserMenu /> : <AuthButton />}</div>
      </header>
      <main className="flex-1 px-4">
        <Outlet />
      </main>
      <SignInDialog />
      <SignUpDialog />
    </div>
  );
}
