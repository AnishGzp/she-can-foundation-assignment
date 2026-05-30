import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="py-3 border-b border-muted-foreground/20">
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-[linear-gradient(135deg,oklch(58%_.2_305)_0%,oklch(68%_.18_340)_100%)]">
              <Heart className="fill-white text-white size-5" />
            </div>
            <div className="">
              <h2 className="text-sm font-semibold">SheCan Foundation</h2>
              <p className="text-sm text-muted-foreground">Empowering Women</p>
            </div>
          </div>
        </Link>

        <Link href={isLoggedIn ? "/dashboard" : "/login"}>
          <Button>{isLoggedIn ? "Dashboard" : "Admin Login"}</Button>
        </Link>
      </nav>
    </header>
  );
}
