'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Password validation helpers
  const passwordRequirements = {
    minLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasDigit: /\d/.test(password),
    hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean)

  useEffect(() => {
    // Check if we have a session (user clicked the reset link)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('Invalid or expired reset link. Please request a new password reset.')
      }
    }
    
    checkSession()
  }, [supabase.auth])

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (!isPasswordValid) {
      setError('Password does not meet all requirements')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Password updated successfully! Redirecting to homepage...')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    } catch (err) {
      console.error('Password update error:', err)
      setError('Password update error occurred')
    } finally {
      setLoading(false)
    }
  }

  const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
    <li className={`flex items-center text-xs ${met ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
      <span className={`mr-2 ${met ? 'text-green-500' : 'text-gray-400'}`}>
        {met ? '✓' : '○'}
      </span>
      {text}
    </li>
  )

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Set your new password
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter a strong password for your account.
          </p>
        </div>
        
        <form onSubmit={handlePasswordReset} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              placeholder="Enter your new password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              placeholder="Confirm your new password"
            />
          </div>

          {/* Password Requirements */}
          {password && (
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Password must contain:</p>
              <ul className="space-y-1">
                <RequirementItem met={passwordRequirements.minLength} text="At least 8 characters" />
                <RequirementItem met={passwordRequirements.hasLowercase} text="Lowercase letter (a-z)" />
                <RequirementItem met={passwordRequirements.hasUppercase} text="Uppercase letter (A-Z)" />
                <RequirementItem met={passwordRequirements.hasDigit} text="Number (0-9)" />
                <RequirementItem met={passwordRequirements.hasSymbol} text="Special character (!@#$%^&*)" />
              </ul>
            </div>
          )}

          {error && (
            <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              {error}
            </div>
          )}

          {message && (
            <div className="p-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isPasswordValid}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-400 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating password...
              </div>
            ) : (
              'Update Password'
            )}
          </button>
        </form>

        <div className="text-center space-y-2">
          <Link
            href="/auth/login"
            className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
} 