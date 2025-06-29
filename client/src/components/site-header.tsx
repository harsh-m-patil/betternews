import { Link } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useQuery(userQueryOptions());
  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <header className="border-border/40 bg-primary/95 supports-[backdrop-filter]:bg-primary/90 sticky top-0 z-50 w-full backdrop-blur">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold">
            BetterNews
          </Link>
          <nav className="hidden items-center space-x-4 md:flex">
            <Link to="/" className="hover:underline">
              new
            </Link>
            <Link to="/" className="hover:underline">
              top
            </Link>
            <Link to="/submit" className="hover:underline">
              submit
            </Link>
          </nav>
        </div>

        <div className="hidden items-center space-x-4 md:flex">
          {user ? (
            <>
              <span>{user}</span>
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="bg-slate-800 text-white hover:bg-slate-800/70"
              >
                <a href="/api/auth/logout">Log out</a>
              </Button>
            </>
          ) : (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="hover:bg-secondary-foreground/70 bg-secondary-foreground text-white"
            >
              <Link to="/login">Log In</Link>
            </Button>
          )}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="secondary" size="icon" className="md:hidden">
              <MenuIcon className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="mb-2">
            <SheetHeader>
              <SheetTitle>BetterNews</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 p-4">
              <Link to="/" onClick={closeSheet} className="hover:underline">
                new
              </Link>
              <Link to="/" onClick={closeSheet} className="hover:underline">
                top
              </Link>
              <Link
                to="/submit"
                onClick={closeSheet}
                className="hover:underline"
              >
                submit
              </Link>
              {user ? (
                <>
                  <span>user: {user}</span>
                  <Button asChild size="sm">
                    <a href="/api/auth/logout">Log out</a>
                  </Button>
                </>
              ) : (
                <Button asChild size="sm">
                  <Link to="/login" onClick={closeSheet}>
                    Log In
                  </Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
