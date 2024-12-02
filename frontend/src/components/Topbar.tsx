import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import SignInOAuthButton from "./SignInOAuthButton";

const Topbar = () => {
  const isAdmin = false;
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex items-center gap-2">
        <Link to="/">Musify</Link>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin">
            <Button variant="ghost">
              <LayoutDashboardIcon className="size-4 mr-2" />
              Admin Dashboard
            </Button>
          </Link>
        )}

        <SignedIn>
          <SignOutButton>
            <Button variant="ghost">
              <LogOutIcon className="size-4 mr-2" />
              Log out
            </Button>
          </SignOutButton>
        </SignedIn>

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
