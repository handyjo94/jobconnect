'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { LinkButton } from '@/components/ui/LinkButton'

export default function AuthButton() {
  const { user, loading, signOut, isSigningOut } = useAuth()

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-24"></div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link 
          href="/profile"
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group"
          title="View Profile"
        >
          <div className="flex-shrink-0">
            {user.user_metadata?.avatar_url ? (
              <Image
                src={user.user_metadata.avatar_url}
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-300 dark:group-hover:ring-blue-600 transition-all duration-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-300 dark:group-hover:ring-blue-600 transition-all duration-200">
                {user.user_metadata?.full_name?.[0] || user.email?.[0] || '?'}
              </div>
            )}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200 hidden sm:block whitespace-nowrap">
            {user.user_metadata?.full_name || user.email}
          </span>
        </Link>
        <Button
          onClick={signOut}
          loading={isSigningOut}
          loadingText="Signing out..."
          variant="ghost"
          size="sm"
          title="Sign out"
          leftIcon={
            <svg className="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          }
        >
          <span className="hidden sm:inline">Sign out</span>
          <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <Link
        href="/auth/login"
        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
      >
        Sign In
      </Link>
      <LinkButton
        href="/get-started"
        variant="primary"
        size="md"
      >
        Get Started
      </LinkButton>
    </div>
  )
} 