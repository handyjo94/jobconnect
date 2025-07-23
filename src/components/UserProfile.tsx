'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { User } from '@supabase/supabase-js'

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please sign in to continue
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          {user.user_metadata?.avatar_url ? (
            <Image
              className="h-16 w-16 rounded-full"
              src={user.user_metadata.avatar_url}
              alt="Profile"
              width={64}
              height={64}
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-xl font-medium text-gray-700">
                {user.user_metadata?.full_name?.[0] || user.email?.[0] || '?'}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
            {user.user_metadata?.full_name || 'User'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 truncate">
            {user.email}
          </p>
        </div>
      </div>
      
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Account Information
        </h3>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              User ID
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
              {user.id}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Last Sign In
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
} 