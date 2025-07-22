import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/auth/LogoutButton'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700/20 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link 
              href="/"
              className="text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              JobConnect
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 bg-white/50 dark:bg-gray-800/50">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Welcome to your dashboard!
              </h2>
              
              <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700/20 rounded-lg p-6 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  User Information
                </h3>
                <div className="space-y-3 text-left">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</span>
                    <span className="text-sm text-gray-900 dark:text-white mt-1">{user.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">User ID</span>
                    <span className="text-sm text-gray-900 dark:text-white mt-1 font-mono">{user.id}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email Confirmed</span>
                    <span className={`text-sm mt-1 font-medium ${user.email_confirmed_at ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {user.email_confirmed_at ? '✓ Verified' : '⚠ Pending'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Member Since</span>
                    <span className="text-sm text-gray-900 dark:text-white mt-1">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg max-w-2xl mx-auto">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  🔒 This is a protected page. You can only access this dashboard when authenticated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 