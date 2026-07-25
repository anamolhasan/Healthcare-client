import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getMeAction } from "@/app/(commonLayout)/_actions/auth.action";


const Navbar = async () => {

    const user = await getMeAction();
    console.log(user)
  return (
    <header className="sticky top-0 z-50   backdrop-blur bg-black text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          PH Healthcare
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>

          <Link
            href="/doctors"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Doctors
          </Link>

          <Link
            href="/specialties"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Specialties
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Right Side */}
   {user ? (
  <>
    <Button asChild>
      <Link href="/dashboard">Dashboard</Link>
    </Button>

    <Avatar>
      <AvatarImage src={user.image ?? ""} />
      <AvatarFallback>
        {user.name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  </>
) : (
  <>
    <Button variant="ghost" asChild>
      <Link href="/login">Login</Link>
    </Button>

    <Button asChild>
      <Link href="/register">Register</Link>
    </Button>
  </>
)}

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;