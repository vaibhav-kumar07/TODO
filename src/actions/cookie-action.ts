'use server'

import { getCookieValue, setCookie, hasCookie, deleteCookie } from '@/lib/common/cookie-utils'
import { ICookieKeys } from '@/types/common'

// Generic cookie setter - accepts any key-value pair
export async function setCookieValue(key: string, value: string) {
  try {
    await setCookie(key, value)
    return { success: true, key, value }
  } catch (error) {
    console.error('Error setting cookie:', error)
    return { success: false, error: 'Failed to set cookie' }
  }
}

// Generic cookie getter - accepts any key
export async function getCookieValueAction(key: string) {
  try {
    const value = await getCookieValue(key)

    return { success: true, key, value }
  } catch (error) {
    console.error('Error getting cookie:', error)
    return { success: false, key, value: '' }
  }
}

// Generic cookie checker - accepts any key
export async function hasCookieValue(key: string) {
  try {
    const exists = await hasCookie(key)
    return { success: true, key, exists }
  } catch (error) {
    console.error('Error checking cookie:', error)
    return { success: false, key, exists: false }
  }
}

// Generic cookie deleter - accepts any key
export async function deleteCookieValue(key: string) {
  try {
    await deleteCookie(key)
    return { success: true, key }
  } catch (error) {
    console.error('Error deleting cookie:', error)
    return { success: false, error: 'Failed to delete cookie' }
  }
}

// Delete multiple cookies by array of keys
export async function deleteMultipleCookies(keys: string[]) {
  try {
    const results = await Promise.all(
      keys.map(key => deleteCookie(key))
    )

    return { success: true, deletedKeys: keys }
  } catch (error) {
    console.error('Error deleting multiple cookies:', error)
    return { success: false, error: 'Failed to delete multiple cookies' }
  }
}

// Clear all cookies (delete all common cookie keys)
export async function clearAllCookies() {
  try {
    const commonKeys = [
      ICookieKeys.TOKEN,
      ICookieKeys.REFRESH_TOKEN,
      ICookieKeys.USER_ROLE,
    ]
    
    await deleteMultipleCookies(commonKeys)
    return { success: true, message: 'All cookies cleared' }
  } catch (error) {
    console.error('Error clearing all cookies:', error)
    return { success: false, error: 'Failed to clear all cookies' }
  }
}

// Get multiple cookies by array of keys
export async function getMultipleCookies(keys: string[]) {
  try {
    const results = await Promise.all(
      keys.map(async key => {
        const result = await getCookieValue(key)
        return { key, value: result }
      })
    )
    
    const cookieData = results.reduce((acc, { key, value }) => {
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    return { success: true, cookies: cookieData }
  } catch (error) {
    console.error('Error getting multiple cookies:', error)
    return { success: false, cookies: {} }
  }
}

// Set multiple cookies from object
export async function setMultipleCookies(cookieData: Record<string, string>) {
  try {
    const results = await Promise.all(
      Object.entries(cookieData).map(([key, value]) => 
        setCookie(key, value)
      )
    )
    
    return { success: true, setKeys: Object.keys(cookieData) }
  } catch (error) {
    console.error('Error setting multiple cookies:', error)
    return { success: false, error: 'Failed to set multiple cookies' }
  }
} 