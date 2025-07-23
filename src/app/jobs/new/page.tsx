'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import JobForm from '@/components/JobForm'
import { jobService } from '@/lib/jobs'
import type { JobFormData } from '@/lib/types'

export default function NewJobPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (jobData: JobFormData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const newJob = await jobService.createJob(jobData)
      setSuccess(true)
      
      // Show success message briefly then redirect
      setTimeout(() => {
        router.push(`/jobs/${newJob.id}`)
      }, 1500)
      
    } catch (err) {
      setError('Failed to create job posting. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Job Posted Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Redirecting to your new job posting...
          </p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Page Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Post a Job
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Find the perfect candidate for your role
              </p>
            </div>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      Error Creating Job
                    </h3>
                    <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Job Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Provide accurate information to attract the right candidates.
              </p>
            </div>

            <JobForm
              onSubmit={handleSubmit}
              submitLabel="Post Job"
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
} 