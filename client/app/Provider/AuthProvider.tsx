import { createContext, useContext, ReactNode } from "react";
import { useState, FC } from "react";
import FClient from "../Api/FeathersClient";
import { User } from "forensic-server";
// Define the functions for our context
interface IAuthFunctions {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  autoLogin: (alreadyAuthenticate: boolean) => void;
  patch: (user: Partial<User>) => void;
}

// Combine states and functions into one type
interface IAuthContextType extends IAuthFunctions {
  logged: boolean;
  loaded: boolean;
  user: User | null;
  error: string;
}

// Create the context with default values
export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined,
);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Separate state variables for our context
  const [logged, setLogged] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  // Functions for our context
  const login = async (email: string, password: string) => {
    try {
      // @ts-ignore
      const res = await FClient.authenticate({
        strategy: "local",
        email,
        password,
      });
      if (error) setError("");
      setUser(res.user);
      setLogged(true);
      setLoaded(true);
      return true;
    } catch (error: any) {
      setError(error.message);
      setLogged(false);
      setLoaded(true);
      return false;
    }
  };

  const logout = () => {
    // @ts-ignore
    FClient.logout();
    setLogged(false);
    setUser(null);
  };

  const autoLogin = async (alreadyAuthenticate: boolean) => {
    try {
      // @ts-ignore
      const res = await FClient.reAuthenticate(alreadyAuthenticate);

      if (error) setError("");
      setUser(res.user);
      setLogged(true);
    } catch (error: any) {
      setError(error.message);
      setLogged(false);
    }
    setLoaded(true);
    // Implement auto login logic here
  };

  const patch = (updatedUser: Partial<User>) => {
    // Implement patch logic here
    // For example, you might merge the updated fields with the existing user:
    // setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  return (
    <AuthContext.Provider
      value={{
        logged,
        loaded,
        user,
        error,
        login,
        logout,
        autoLogin,
        patch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
