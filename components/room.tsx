"use client";

import { RoomProvider, useErrorListener } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Lock } from "lucide-react";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

const RoomErrorHandler = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  useErrorListener((err) => {
    if (err.message.includes("Unauthorized") || err.message.includes("403")) {
      setError("You are not authorized to access this draw.");
    } else {
      setError("Service unavailable. Please try again later.");
    }
  });

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-200"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.4,
                type: "spring",
                stiffness: 200,
              }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
            >
              {error.includes("authorized") ? (
                <Lock className="h-8 w-8 text-red-600" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              )}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              className="text-2xl font-bold text-gray-900 mb-3"
            >
              {error.includes("authorized")
                ? "Access Denied"
                : "Service Unavailable"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="text-gray-600 leading-relaxed"
            >
              {error}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return <>{children}</>;
};

export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList([]),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        <RoomErrorHandler>{children}</RoomErrorHandler>
      </ClientSideSuspense>
    </RoomProvider>
  );
};
