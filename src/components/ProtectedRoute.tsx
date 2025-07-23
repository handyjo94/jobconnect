'use client'

import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  readonly children: React.ReactNode
  readonly fallback?: React.ReactNode
  readonly redirectTo?: string
}

export default function ProtectedRoute({
  children,
  fallback,
  redirectTo = '/auth/login'
}: ProtectedRouteProps) {
  const { user, loading } = useAuth({ redirectTo })

  if (loading) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )
    )
  }

  if (!user) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Redirecting to sign in...
            </p>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
} 