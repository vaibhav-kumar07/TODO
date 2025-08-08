"use client";

import { useSocket } from "@/components/provider/socketProvider";
import React from "react";

export default function WebsocketConnectionStatus() {
  const { connected } = useSocket();

  return (
    <span
      role="status"
      aria-live="polite"
      className={`w-full sm:w-fit flex justify-center items-center    gap-2 rounded-full border px-2.5 py-1 text-xs font-medium shadow-sm transition-colors ${
        connected
          ? "border-emerald-200/60 text-emerald-700 dark:text-emerald-400"
          : "border-red-200/60 text-red-700 dark:text-red-400"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-3 w-3  md:h-2.5 md:w-2.5 rounded-full ${
          connected ? "bg-emerald-500" : "bg-red-500"
        }`}
      />
      <span className="">{connected ? "Connected" : "Disconnected"}</span>
    </span>
  );
}
