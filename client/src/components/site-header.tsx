// components/header.tsx
import { Link } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = () => setIsOpen(false);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Nav */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold tracking-tight">
            BetterWork
          </Link>
          <nav className="text-muted-foreground hidden items-center space-x-4 text-sm md:flex">
            <Link to="/" className="hover:text-foreground">
              Jobs
            </Link>
            <Link to="/" className="hover:text-foreground">
              Apply
            </Link>
            <Link to="/" className="hover:text-foreground">
              About
            </Link>
          </nav>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Button asChild size="sm" variant="secondary">
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>BetterWork</SheetTitle>
              <SheetDescription className="sr-only">
                Mobile navigation
              </SheetDescription>
            </SheetHeader>
            <nav className="mt-4 flex flex-col space-y-4">
              <Link to="/" onClick={closeSheet} className="hover:underline">
                Jobs
              </Link>
              <Link to="/" onClick={closeSheet} className="hover:underline">
                Apply
              </Link>
              <Link
                to="/about"
                onClick={closeSheet}
                className="hover:underline"
              >
                About
              </Link>
              <Button asChild size="sm">
                <Link to="/login" onClick={closeSheet}>
                  Login
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
