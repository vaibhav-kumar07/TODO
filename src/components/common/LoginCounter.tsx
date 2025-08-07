"use client";

import { useEffect, useState } from "react";
import { AdminDashboardWebSocket } from "@/components/websocket/adminDashbordWebsocket";

export default function LoginCounter() {
  const [loginCount, setLoginCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    const adminSocket = new AdminDashboardWebSocket();

    // Get initial count from API
    adminSocket.checkLoginAPIData().then((data) => {
      if (data?.data?.totalLogins) {
        setLoginCount(data.data.totalLogins);
        setLastUpdate(data.data.lastUpdated);
      }
    });

    // Request current count from WebSocket
    adminSocket.requestLoginCount();

    return () => {
      // Cleanup handled by the class
    };
  }, []);

  const handleSimulateLogin = async () => {
    try {
      const response = await fetch("/api/socket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "simulate-login",
          userId: "test-user-" + Date.now(),
          email: "test@example.com",
        }),
      });

      if (response.ok) {
        console.log("✅ Login simulation triggered");
      }
    } catch (error) {
      console.error("❌ Failed to simulate login:", error);
    }
  };

  const handleIncrementCount = async () => {
    try {
      const response = await fetch("/api/dashboard/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ increment: 1 }),
      });

      if (response.ok) {
        const data = await response.json();
        setLoginCount(data.data.totalLogins);
        setLastUpdate(data.data.lastUpdated);
        console.log("✅ Login count incremented");
      }
    } catch (error) {
      console.error("❌ Failed to increment count:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">🔢 Login Counter</h2>

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600">{loginCount}</div>
          <div className="text-sm text-gray-500">Total Logins</div>
          {lastUpdate && (
            <div className="text-xs text-gray-400 mt-1">
              Last updated: {new Date(lastUpdate).toLocaleString()}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSimulateLogin}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            🎭 Simulate Login
          </button>

          <button
            onClick={handleIncrementCount}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ➕ Increment Count
          </button>
        </div>

        <div className="text-xs text-gray-500">
          💡 Check browser console for real-time WebSocket events
        </div>
      </div>
    </div>
  );
}
