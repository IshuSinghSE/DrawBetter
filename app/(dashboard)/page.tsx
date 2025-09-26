"use client";

import { useOrganization } from "@clerk/nextjs";
import { use } from "react";
import EmptyOrg from "./_components/empty-org";
import DrawList from "./_components/draw-list";

interface DashboardPageProps {
  searchParams: Promise<{
    search?: string;
    favorites?: string;
  }>;
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const { organization } = useOrganization();
  const params = use(searchParams);
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <DrawList orgId={organization.id} query={params} />
      )}
    </div>
  );
}
