"use client";

import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import { useEffect } from "react";

export const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  });
  const { organization } = useOrganization();

  useEffect(() => {
    if (organization && userMemberships.revalidate) {
      userMemberships.revalidate();
    }
  }, [organization?.id]);

  if (!userMemberships.data?.length) return null;

  return (
    <ul className="space-y-4 text-white">
      {userMemberships.data?.map((mem) => (
        <p key={mem.organization.id}>{mem.organization.name}</p>
      ))}
    </ul>
  );
};
