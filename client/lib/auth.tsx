import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setAuthToken } from "@/lib/api";

export function useAuthToken() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAuthToken(token);
        } catch (error) {
          console.error("Error getting token:", error);
          setAuthToken(null);
        }
      } else {
        setAuthToken(null);
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);
}

export function AuthTokenProvider({ children }: { children: React.ReactNode }) {
  useAuthToken();
  return <>{children}</>;
}
