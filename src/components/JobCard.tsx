import Link from 'next/link'
import type { Job } from '@/lib/types'
import { Button } from '@/components/ui/Button'

interface JobCardProps {
  readonly job: Job
  readonly showActions?: boolean
  readonly onEdit?: (job: Job) => void
  readonly onDelete?: (jobId: string) => void
}

export default function JobCard({ job, showActions = false, onEdit, onDelete }: JobCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getJobTypeColor = (jobType: string) => {
    switch (jobType) {
      case 'Full-Time':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Part-Time':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Contract':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  // Dynamic height based on whether actions are shown
  const cardHeight = showActions ? 'min-h-80' : 'min-h-64'

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow ${cardHeight} flex flex-col w-full overflow-hidden`}>
      <div className="flex justify-between items-start mb-4 min-w-0">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 leading-tight break-words">
            <Link
              href={`/jobs/${job.id}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
            >
              {job.title}
            </Link>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 font-medium truncate">
            {job.company}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center mt-1 min-w-0">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{job.location}</span>
          </p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ml-2 flex-shrink-0 ${getJobTypeColor(job.job_type)}`}>
          {job.job_type}
        </span>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed break-words overflow-hidden">
          <p className="line-clamp-4 hyphens-auto">
            {job.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 min-w-0">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
            Posted {formatDate(job.created_at)}
          </span>
          
          {showActions && (
            <div className="flex gap-3 flex-shrink-0 ml-4">
              <Button
                onClick={() => onEdit?.(job)}
                variant="outline"
                size="sm"
                leftIcon={
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                }
              >
                Edit
              </Button>
              <Button
                onClick={() => onDelete?.(job.id)}
                variant="outline-danger"
                size="sm"
                leftIcon={
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                }
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 