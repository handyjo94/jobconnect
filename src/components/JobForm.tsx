'use client'

import { useState } from 'react'
import type { JobFormData } from '@/lib/types'
import { Button } from '@/components/ui/Button'

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

  const handleDescriptionPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    
    // Get pasted content
    const paste = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain')
    
    if (paste) {
      // Clean and format the pasted content
      const cleanedText = cleanJobDescription(paste)
      
      // Get current cursor position
      const textarea = e.target as HTMLTextAreaElement
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      // Insert cleaned text at cursor position
      const currentValue = formData.description
      const newValue = currentValue.substring(0, start) + cleanedText + currentValue.substring(end)
      
      handleChange('description', newValue)
      
      // Restore cursor position after the inserted text
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + cleanedText.length
      }, 0)
    }
  }

  const cleanJobDescription = (htmlContent: string): string => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent
    
    // Remove script and style elements
    const scripts = tempDiv.querySelectorAll('script, style')
    scripts.forEach(el => el.remove())
    
    // Convert common HTML elements to formatted text
    let text = tempDiv.innerHTML
    
    // Replace line breaks and paragraphs
    text = text.replace(/<br\s*\/?>/gi, '\n')
    text = text.replace(/<\/p>/gi, '\n\n')
    text = text.replace(/<p[^>]*>/gi, '')
    
    // Handle lists
    text = text.replace(/<\/li>/gi, '\n')
    text = text.replace(/<li[^>]*>/gi, '• ')
    text = text.replace(/<\/?[uo]l[^>]*>/gi, '\n')
    
    // Handle headings
    text = text.replace(/<\/h[1-6]>/gi, '\n\n')
    text = text.replace(/<h[1-6][^>]*>/gi, '')
    
    // Handle strong/bold text (keep the text, remove tags)
    text = text.replace(/<\/?strong[^>]*>/gi, '')
    text = text.replace(/<\/?b[^>]*>/gi, '')
    
    // Handle emphasis/italic text
    text = text.replace(/<\/?em[^>]*>/gi, '')
    text = text.replace(/<\/?i[^>]*>/gi, '')
    
    // Remove all remaining HTML tags
    text = text.replace(/<[^>]*>/g, '')
    
    // Decode HTML entities
    text = text.replace(/&nbsp;/g, ' ')
    text = text.replace(/&amp;/g, '&')
    text = text.replace(/&lt;/g, '<')
    text = text.replace(/&gt;/g, '>')
    text = text.replace(/&quot;/g, '"')
    text = text.replace(/&#39;/g, "'")
    text = text.replace(/&ldquo;/g, '"')
    text = text.replace(/&rdquo;/g, '"')
    text = text.replace(/&lsquo;/g, "'")
    text = text.replace(/&rsquo;/g, "'")
    text = text.replace(/&mdash;/g, '—')
    text = text.replace(/&ndash;/g, '–')
    
    // Clean up extra whitespace and line breaks
    text = text.replace(/\n\s*\n\s*\n/g, '\n\n') // Max 2 consecutive line breaks
    text = text.replace(/[ \t]+/g, ' ') // Multiple spaces to single space
    text = text.trim()
    
    return text
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
          onPaste={handleDescriptionPaste}
          placeholder="Describe the role, responsibilities, requirements, and any other relevant details..."
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-vertical ${
            errors.description 
              ? 'border-red-300 dark:border-red-600' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
          disabled={isLoading}
        />
        <div className="mt-1 flex justify-between items-start">
          <div className="flex flex-col">
            {errors.description && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.description}</p>
            )}
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              💡 Tip: You can paste job descriptions from anywhere - formatting will be preserved!
            </p>
          </div>
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
        <Button
          type="submit"
          loading={isLoading}
          loadingText="Processing..."
          variant="primary"
          size="md"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
} 