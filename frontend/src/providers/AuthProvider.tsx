// AuthProvider.tsx
import { createContext, useEffect, type ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

// Define the context type - using Record<string, never> for truly empty object
// or you can use `object` if you want to allow any object type
type AuthContextType = Record<string, never>;

// Create context with proper typing
const AuthContext = createContext<AuthContextType>({});

// Define props interface for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { getToken } = useAuth();

  useEffect(() => {
    // Setup axios interceptor
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error: unknown) {
          // Type guard for error handling
          if (error instanceof Error) {
            if (
              error.message?.includes("auth") ||
              error.message?.includes("token")
            ) {
              toast.error("Authentication issue. Please refresh the page.");
            }
            console.log("Error getting token:", error);
          } else {
            console.log("Unknown error getting token:", error);
          }
        }
        return config;
      },
      (error: unknown) => {
        console.error("Axios request error:", error);
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove the interceptor to avoid memory leaks
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [getToken]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

// Export the context for use in other components
export { AuthContext };
