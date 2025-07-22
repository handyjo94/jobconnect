'use client'

import { useState } from 'react'
import type { JobFormData } from '@/lib/types'

interface JobFormProps {
  readonly initialData?: Partial<JobFormData>
  readonly onSubmit: (data: JobFormData) => Promise<void>
  readonly submitLabel?: string
  readonly isLoading?: boolean
}

export default function JobForm({ 
  initialData = {}, 
  onSubmit, 
  submitLabel = 'Post Job',
  isLoading = false 
}: JobFormProps) {
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData.title || '',
    company: initialData.company || '',
    description: initialData.description || '',
    location: initialData.location || '',
    job_type: initialData.job_type || 'Full-Time'
  })

  const [errors, setErrors] = useState<Partial<JobFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<JobFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required'
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Error submitting form:', error)
      // Error handling is done in the parent component
    }
  }

  const handleChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Job Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Title *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g., Senior Frontend Developer"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
            errors.title 
              ? 'border-red-300 dark:border-red-600' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="e.g., Tech Corp Inc."
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
            errors.company 
              ? 'border-red-300 dark:border-red-600' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
          disabled={isLoading}
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Location *
        </label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g., New York, NY or Remote"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
            errors.location 
              ? 'border-red-300 dark:border-red-600' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
          disabled={isLoading}
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>
        )}
      </div>

      {/* Job Type */}
      <div>
        <label htmlFor="job_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Type *
        </label>
        <select
          id="job_type"
          value={formData.job_type}
          onChange={(e) => handleChange('job_type', e.target.value as JobFormData['job_type'])}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          disabled={isLoading}
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Description *
        </label>
        <textarea
          id="description"
          rows={8}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe the role, responsibilities, requirements, and any other relevant details..."
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-vertical ${
            errors.description 
              ? 'border-red-300 dark:border-red-600' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
          disabled={isLoading}
        />
        <div className="mt-1 flex justify-between">
          {errors.description && (
            <p className="text-sm text-red-600 dark:text-red-400">{errors.description}</p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
            {formData.description.length} characters
            {formData.description.length < 50 && formData.description.length > 0 && (
              <span className="text-red-500"> (minimum 50)</span>
            )}
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  )
} 