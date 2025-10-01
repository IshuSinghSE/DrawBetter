"use client";
import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./user-avatar";

import React from "react";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 5;

const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute h-14 top-2 right-2 rounded-xl glass p-3 flex items-center shadow-medium hover:shadow-strong transition-all duration-300">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          );
        })}
        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0] || "Y"}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more users`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export default Participants;

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-14 top-2 right-2 rounded-xl glass p-3 flex items-center shadow-medium w-[100px]" />
  );
};
