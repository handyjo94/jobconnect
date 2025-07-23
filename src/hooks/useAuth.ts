'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js'

interface UseAuthOptions {
  redirectTo?: string
  redirectOnSignOut?: boolean
}

interface UseAuthReturn {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  isSigningOut: boolean
  signIn: (email: string, password: string) => Promise<{ error?: Error }>
  signUp: (email: string, password: string) => Promise<{ error?: Error }>
  signInWithOAuth: (provider: 'google') => Promise<{ error?: Error }>
  resetPassword: (email: string) => Promise<{ error?: Error }>
  updatePassword: (password: string) => Promise<{ error?: Error }>
}

export function useAuth(options: UseAuthOptions = {}): UseAuthReturn {
  const { redirectTo, redirectOnSignOut = false } = options
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        setLoading(false)
        
        // Redirect if user is not authenticated and redirectTo is specified
        if (!user && redirectTo) {
          router.push(redirectTo)
        }
      } catch (error) {
        console.error('Error getting user:', error)
        setLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Handle redirects based on auth state changes
        if (!session?.user && redirectTo) {
          router.push(redirectTo)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth, router, redirectTo])

  const signOut = useCallback(async () => {
    setIsSigningOut(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      if (redirectOnSignOut) {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    } finally {
      setIsSigningOut(false)
    }
  }, [supabase.auth, router, redirectOnSignOut])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) return { error }
      return {}
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: error as Error }
    }
  }, [supabase.auth])

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) return { error }
      return {}
    } catch (error) {
      console.error('Sign up error:', error)
      return { error: error as Error }
    }
  }, [supabase.auth])

  const signInWithOAuth = useCallback(async (provider: 'google') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) return { error }
      return {}
    } catch (error) {
      console.error(`${provider} OAuth error:`, error)
      return { error: error as Error }
    }
  }, [supabase.auth])

  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      
      if (error) return { error }
      return {}
    } catch (error) {
      console.error('Reset password error:', error)
      return { error: error as Error }
    }
  }, [supabase.auth])

  const updatePassword = useCallback(async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })
      
      if (error) return { error }
      return {}
    } catch (error) {
      console.error('Update password error:', error)
      return { error: error as Error }
    }
  }, [supabase.auth])

  return {
    user,
    loading,
    signOut,
    isSigningOut,
    signIn,
    signUp,
    signInWithOAuth,
    resetPassword,
    updatePassword,
  }
} 