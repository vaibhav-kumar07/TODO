"use client";

import { useState, useEffect } from "react";
import { useSocket } from "@/components/provider/socketProvider";
import { EventType, DashboardStats } from "@/types/dashboard";

export function useDashboardEvents(initialStats?: DashboardStats) {
  const { socket, connected } = useSocket();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(initialStats || null);

  useEffect(() => {
    if (!socket || !connected) return;

    // Listen for LOGIN events
    const handleLoginEvent = (data: any) => {
      console.log("LOGIN event received:", data);
      
      setDashboardStats(prevStats => {
        if (!prevStats) return prevStats;
        
        return {
          ...prevStats,
          totalLogins: prevStats.totalLogins + 1,
          loginsToday: prevStats.loginsToday + 1,
        };
      });
    };

    // Listen for LOGIN_FAILED events
    const handleLoginFailedEvent = (data: any) => {
      console.log("LOGIN_FAILED event received:", data);
      
      setDashboardStats(prevStats => {
        if (!prevStats) return prevStats;
        
        return {
          ...prevStats,
          failedLoginsToday: prevStats.failedLoginsToday + 1,
        };
      });
    };

    // Listen for PASSWORD_RESET events
    const handlePasswordResetEvent = (data: any) => {
      console.log("PASSWORD_RESET event received:", data);
      
      setDashboardStats(prevStats => {
        if (!prevStats) return prevStats;
        
        return {
          ...prevStats,
          passwordResetsToday: prevStats.passwordResetsToday + 1,
        };
      });
    };

    // Add event listeners
    socket.on(EventType.LOGIN, handleLoginEvent);
    socket.on(EventType.LOGIN_FAILED, handleLoginFailedEvent);
    socket.on(EventType.PASSWORD_RESET, handlePasswordResetEvent);

    // Cleanup function
    return () => {
      socket.off(EventType.LOGIN, handleLoginEvent);
      socket.off(EventType.LOGIN_FAILED, handleLoginFailedEvent);
      socket.off(EventType.PASSWORD_RESET, handlePasswordResetEvent);
    };
  }, [socket, connected]);

  return {
    dashboardStats,
    connected,
    updateStats: (newStats: Partial<DashboardStats>) => {
      setDashboardStats(prev => prev ? { ...prev, ...newStats } : null);
    }
  };
}
