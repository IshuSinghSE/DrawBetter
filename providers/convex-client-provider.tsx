"use client";

import { Loading } from "@/components/auth/loading";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient, AuthLoading, Authenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

// Create a separate component that uses useAuth inside ClerkProvider
const ConvexWrapper = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  const customAuth = {
    ...auth,
    getToken: async (options?: { template?: "convex"; skipCache?: boolean }) => {
      return await auth.getToken({ 
        template: "convex",
        ...options 
      });
    },
  };

  return (
    <ConvexProviderWithClerk client={convex} useAuth={() => customAuth}>
      <Authenticated>
        {children}
      </Authenticated>
      <AuthLoading>
        <Loading />
      </AuthLoading>
    </ConvexProviderWithClerk>
  );
};

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider>
      <ConvexWrapper>
        {children}
      </ConvexWrapper>
    </ClerkProvider>
  );
};
