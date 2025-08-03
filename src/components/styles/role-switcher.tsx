"use client"

import { useRoleTheme } from "./theme-provider"

export function RoleSwitcher() {
  const { role, setRole, isLoading } = useRoleTheme()

  const handleRoleChange = async (newRole: "admin" | "manager" | "member") => {
    try {
      await setRole(newRole)
    } catch (error) {
      console.error('Error changing role:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 border">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 border">
      <h3 className="text-sm font-medium text-gray-900 mb-2">Switch Role</h3>
      <div className="space-y-2">
        <button
          onClick={() => handleRoleChange("admin")}
          className={`w-full px-3 py-2 text-sm rounded-md transition-colors ${
            role === "admin"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => handleRoleChange("manager")}
          className={`w-full px-3 py-2 text-sm rounded-md transition-colors ${
            role === "manager"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Manager
        </button>
        <button
          onClick={() => handleRoleChange("member")}
          className={`w-full px-3 py-2 text-sm rounded-md transition-colors ${
            role === "member"
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Member
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Current: {role}</p>
    </div>
  )
} 