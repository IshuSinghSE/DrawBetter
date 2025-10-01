"use client";

import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import { useEffect } from "react";
import { Item } from "./item";

export const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  });
  const { organization } = useOrganization();

  useEffect(() => {
    if (organization && userMemberships.revalidate) {
      userMemberships.revalidate();
    }
  }, [organization?.id, organization, userMemberships]);

  if (!userMemberships.data?.length) return null;

  return (
    <ul className="space-y-4 text-white">
      {userMemberships.data?.map((mem) => (
        <Item
          key={mem.organization.id}
          id={mem.organization.id}
          name={mem.organization.name}
          imageUrl={mem.organization.imageUrl}
        />
      ))}
    </ul>
  );
};
