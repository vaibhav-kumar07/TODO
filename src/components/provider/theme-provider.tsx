"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getCookieValueAction, setCookieValue } from "@/actions/cookie-action"  
import { ICookieKeys } from "@/types/common"
import { UserRole } from "@/types/auth"

export type Role = UserRole

interface RoleThemeContextType {
  role: Role
  setRole: (role: Role) => void
  isLoading: boolean
}

const RoleThemeContext = createContext<RoleThemeContextType | undefined>(undefined)

export function useRoleTheme() {
  const context = useContext(RoleThemeContext)
  if (context === undefined) {
    throw new Error("useRoleTheme must be used within a RoleThemeProvider")
  }
  return context
}

interface RoleThemeProviderProps {
  children: React.ReactNode
  defaultRole?: Role
}

export function RoleThemeProvider({
  children,
  defaultRole = UserRole.ADMIN
}: RoleThemeProviderProps) {
  const [role, setRoleState] = useState<Role>(defaultRole)
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load role from cookie on mount
  useEffect(() => {
    async function loadRoleFromCookie() {
      try {
        const result = await getCookieValueAction(ICookieKeys.USER_ROLE)
        if (result.success && result.value) {
          setRoleState(result.value as Role)
        }
      } catch (error) {
        console.error('Error loading role from cookie:', error)
      } finally {
        setIsLoading(false)
        setMounted(true)
      }
    }

    loadRoleFromCookie()
  }, [])

  // Update role in cookie and state
  const setRole = async (newRole: Role) => {
    try {
        const result = await setCookieValue(ICookieKeys.USER_ROLE, newRole)
      if (result.success) {
        setRoleState(newRole)
      } else {
        console.error('Failed to set role in cookie:', result.error)
      }
    } catch (error) {
      console.error('Error setting role:', error)
    }
  }

  useEffect(() => {
    if (mounted) {
      const root = window.document.documentElement
      root.classList.remove("role-admin", "role-manager", "role-member")
      root.classList.add(`role-${role}`)
    }
  }, [role, mounted])

  if (!mounted) {
    return null
  }

  return (
    <RoleThemeContext.Provider value={{ role, setRole, isLoading }}>
      {children}
    </RoleThemeContext.Provider>
  )
} 