import Link from "next/link";
import { createClient } from '@/utils/supabase/server'
import GoogleOAuthButton from '@/components/auth/GoogleOAuthButton'
import AuthDivider from '@/components/auth/AuthDivider'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors flex items-center justify-center p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            JobConnect
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Professional networking and job opportunities
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700/20 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          {user ? (
            <div className="text-center">
              <p className="text-green-600 dark:text-green-400 mb-6">
                ✅ You are signed in as: <strong>{user.email}</strong>
              </p>
              <Link
                href="/dashboard"
                className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Welcome! Please sign in or create an account to continue.
              </p>
              <div className="space-y-4">
                {/* Google OAuth Button */}
                <GoogleOAuthButton mode="signin" />
                
                {/* Divider */}
                <AuthDivider />
                
                {/* Traditional Auth Options */}
                <div className="space-y-3">
                  <Link
                    href="/auth/login"
                    className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
                  >
                    Sign In with Email
                  </Link>
                  <Link
                    href="/auth/register"
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
