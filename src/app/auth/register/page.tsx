import Link from 'next/link'
import SignUpForm from '@/components/auth/SignUpForm'
import HomeButton from '@/components/HomeButton'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Join JobConnect
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg dark:shadow-gray-700/20 sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          <SignUpForm />
        </div>
        
        <div className="flex justify-center">
          <HomeButton />
        </div>
      </div>
    </div>
  )
} 