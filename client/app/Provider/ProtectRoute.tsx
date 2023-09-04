import { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactNode } from "react";

export const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const { logged, loaded, autoLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loaded) {
      autoLogin(false);
    } else if (router.pathname.startsWith("/protect") && !logged) {
      // If the user is not logged in and is trying to access a protected route, redirect to the login page.
      router.push("/");
    }
  }, [loaded, logged, autoLogin, router]);

  if (!loaded) {
    // If the authentication status is still being determined, you could return a loading state.
    return <p>Loading...</p>;
  }

  if (router.pathname.startsWith("/protect/board/")) {
    return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
  }

  return children;
};
