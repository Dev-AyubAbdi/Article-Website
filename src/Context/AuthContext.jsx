import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange } from "../lib/auth";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cleanup = onAuthChange(async (user) => {
      setUser(user);

      if (user) {
        try {
          const userProfile = await getUserProfile(user.id);
          setProfile(userProfile);
        } catch (error) {
          console.error("error fetching user profile", error);
        }
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });
    return cleanup;
  }, []);

  const value = {
    user,
    profile,
    setIsLoading,
    isLoggedIn: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new error("useAuth must be used within authprovider");
  }
  return context;
}
