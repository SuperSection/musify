import { useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axios";

const updateAuthHeader = async (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common.Authorization;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateAuthHeader(token);
        setIsLoading(false);
      } catch (error) {
        updateAuthHeader(null);
        console.error("Error in auth provider", error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [getToken]);

  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader2 className="size-8 text-violet-600 animate-spin" />
      </div>
    );

  return <>{children}</>;
};

export default AuthProvider;
