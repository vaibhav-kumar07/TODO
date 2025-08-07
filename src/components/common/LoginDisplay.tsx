"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface LoginDisplayProps {
  token: string;
  initialLoginCount?: number;
  onLoginCountChange?: (count: number) => void;
}

export default function LoginDisplay({
  token,
  initialLoginCount = 0,
  onLoginCountChange,
}: LoginDisplayProps) {
  const [loginCount, setLoginCount] = useState<number>(initialLoginCount);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastLogin, setLastLogin] = useState<any>(null);
  const [lastLogout, setLastLogout] = useState<any>(null);

  // WebSocket connection and event listeners
  useEffect(() => {
    if (!token) return;

    console.log("🔌 Connecting to WebSocket...");
    const newSocket = io("http://localhost:3001/dashboard", {
      auth: { token },
      transports: ["websocket"],
      //   transports: ["websocket", "polling"],
    });

    // ===== CONNECTION EVENTS =====
    newSocket.on("connect", () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
    });

    // newSocket.on("disconnect", () => {
    //   console.log("❌ WebSocket disconnected");
    //   setIsConnected(false);
    // });

    // newSocket.on("connect_error", (error) => {
    //   console.error("❌ WebSocket connection error:", error);
    //   setIsConnected(false);
    // });

    // ===== AUTHENTICATION EVENTS =====
    newSocket.on("connected", (data) => {
      console.log("📊 Connection confirmed:", data);
      console.log("👤 Connected as:", data.user.email, `(${data.user.role})`);
    });

    // ===== USER ACTIVITY EVENTS =====
    newSocket.on("user-login", (data) => {
      console.log("👤 New user login:", data);
      console.log("�� User details:", {
        email: data.user.email,
        role: data.user.role,
        name: data.user.name,
        time: new Date(data.timestamp).toLocaleString(),
      });

      setLoginCount((prev) => {
        const newCount = prev + 1;
        onLoginCountChange?.(newCount);
        return newCount;
      });
      setLastLogin(data);
      setLastUpdate(new Date().toISOString());
    });

    newSocket.on("user-logout", (data) => {
      console.log("�� User logged out:", data);
      console.log("�� User details:", {
        email: data.user.email,
        role: data.user.role,
        name: data.user.name,
        time: new Date(data.timestamp).toLocaleString(),
      });

      setLastLogout(data);
      setLastUpdate(new Date().toISOString());
    });

    // ===== ERROR EVENTS =====
    newSocket.on("error", (data) => {
      console.error("❌ WebSocket error:", data);
      console.error("💬 Error message:", data.message);
      if (data.details) {
        console.error("🔍 Error details:", data.details);
      }
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      console.log("🔌 Disconnecting WebSocket...");
      newSocket.disconnect();
    };
  }, [token, onLoginCountChange]);

  // Update local state when prop changes
  useEffect(() => {
    if (initialLoginCount !== undefined) {
      setLoginCount(initialLoginCount);
    }
  }, [initialLoginCount]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">�� Total Logins</h2>
        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="text-sm text-blue-500">⏳ Loading...</div>
          )}
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
            title={
              isConnected ? "WebSocket Connected" : "WebSocket Disconnected"
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        {/* Login Count Display */}
        <div className="text-center">
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {isLoading ? "..." : loginCount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Total User Logins</div>

          {lastUpdate && (
            <div className="text-xs text-gray-400 mt-2">
              Last updated: {new Date(lastUpdate).toLocaleString()}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {lastLogin && (
          <div className="text-xs text-green-600 text-center">
            🆕 Last login: {lastLogin.user.email} at{" "}
            {new Date(lastLogin.timestamp).toLocaleString()}
          </div>
        )}

        {lastLogout && (
          <div className="text-xs text-orange-600 text-center">
            �� Last logout: {lastLogout.user.email} at{" "}
            {new Date(lastLogout.timestamp).toLocaleString()}
          </div>
        )}

        {/* Status Indicators */}
        <div className="flex justify-center gap-4">
          <div
            className={`text-sm px-3 py-1 rounded-full inline-block ${
              token ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {token ? "�� Token Available" : "❌ No Token"}
          </div>

          <div
            className={`text-sm px-3 py-1 rounded-full inline-block ${
              isConnected
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isConnected
              ? "🔌 WebSocket Connected"
              : "❌ WebSocket Disconnected"}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              socket?.emit("simulate-login", {
                userId: "test-user-" + Date.now(),
                email: "test@example.com",
                name: "Test User",
              });
            }}
            disabled={!isConnected}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎭 Simulate Login
          </button>

          <button
            onClick={() => {
              socket?.emit("get-login-count");
            }}
            disabled={!isConnected}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔄 Get Count
          </button>
        </div>

        {/* Event Info */}
        <div className="text-xs text-gray-500 text-center space-y-1">
          <div>
            🎯 Listening for: connect, disconnect, connected, user-login,
            user-logout, error
          </div>
          <div>🔌 Real-time updates via WebSocket</div>
          <div>�� Counter increments automatically on new logins</div>
        </div>
      </div>
    </div>
  );
}
