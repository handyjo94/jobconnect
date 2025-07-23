'use client'

import { useState, useEffect, useCallback } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import UserProfile from '@/components/UserProfile'
import JobCard from '@/components/JobCard'
import JobForm from '@/components/JobForm'
import HomeButton from '@/components/HomeButton'
import ConfirmationModal from '@/components/ConfirmationModal'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { jobService } from '@/lib/jobs'
import type { Job, JobFormData } from '@/lib/types'

export default function Dashboard() {
  const [userJobs, setUserJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean
    jobId: string | null
    jobTitle: string
    isDeleting: boolean
  }>({
    isOpen: false,
    jobId: null,
    jobTitle: '',
    isDeleting: false
  })
  const supabase = createClient()

  const loadUserData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const jobs = await jobService.getUserJobs(user.id)
        setUserJobs(jobs)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase.auth])

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  const handleEditJob = (job: Job) => {
    setEditingJob(job)
  }

  const handleUpdateJob = async (jobData: JobFormData) => {
    if (!editingJob) return

    try {
      setIsSubmitting(true)
      await jobService.updateJob(editingJob.id, jobData)
      await loadUserData()
      setEditingJob(null)
    } catch (error) {
      console.error('Error updating job:', error)
      alert('Failed to update job. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteJob = (jobId: string) => {
    const job = userJobs.find(j => j.id === jobId)
    if (!job) return
    
    setDeleteConfirmation({
      isOpen: true,
      jobId,
      jobTitle: job.title,
      isDeleting: false
    })
  }

  const handleConfirmDelete = async () => {
    if (!deleteConfirmation.jobId) return

    try {
      setDeleteConfirmation(prev => ({ ...prev, isDeleting: true }))
      await jobService.deleteJob(deleteConfirmation.jobId)
      await loadUserData()
      setDeleteConfirmation({
        isOpen: false,
        jobId: null,
        jobTitle: '',
        isDeleting: false
      })
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Failed to delete job. Please try again.')
      setDeleteConfirmation(prev => ({ ...prev, isDeleting: false }))
    }
  }

  const handleCancelDelete = () => {
    setDeleteConfirmation({
      isOpen: false,
      jobId: null,
      jobTitle: '',
      isDeleting: false
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Manage your job postings and profile
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/jobs/new"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Post a Job
                </Link>
                <Link
                  href="/jobs"
                  className="inline-flex items-center px-5 py-3 border border-emerald-300 dark:border-emerald-600 text-sm font-medium rounded-xl text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                  </svg>
                  Browse Jobs
                </Link>
                <HomeButton />
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8">
            {/* User Profile */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Your Profile
              </h2>
              <UserProfile />
            </div>

            {/* Your Job Postings */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Job Postings
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {(() => {
                    if (loading) return 'Loading...'
                    const jobText = userJobs.length === 1 ? 'job' : 'jobs'
                    return `${userJobs.length} ${jobText}`
                  })()}
                </div>
              </div>

              {loading && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && userJobs.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {userJobs.map((job) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      showActions={true}
                      onEdit={handleEditJob}
                      onDelete={handleDeleteJob}
                    />
                  ))}
                </div>
              )}

              {!loading && userJobs.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No job postings yet</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Start by creating your first job posting.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/jobs/new"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Post Your First Job
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Dashboard Stats */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Overview
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Active Jobs
                      </h3>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {userJobs.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Authentication
                      </h3>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        Verified
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Account Status
                      </h3>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Job Modal */}
          {editingJob && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Edit Job: {editingJob.title}
                    </h3>
                    <button
                      onClick={() => setEditingJob(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <JobForm
                    initialData={editingJob}
                    onSubmit={handleUpdateJob}
                    submitLabel="Update Job"
                    isLoading={isSubmitting}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          <ConfirmationModal
            isOpen={deleteConfirmation.isOpen}
            title="Delete Job Posting"
            message={`Are you sure you want to delete "${deleteConfirmation.jobTitle}"? This action cannot be undone.`}
            confirmLabel="Delete Job"
            cancelLabel="Cancel"
            confirmButtonVariant="danger"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            isLoading={deleteConfirmation.isDeleting}
          />
        </main>
      </div>
    </ProtectedRoute>
  )
} 