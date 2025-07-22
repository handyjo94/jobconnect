import { JobFilters } from '@/lib/types'

interface JobFiltersProps {
  readonly filters: JobFilters
  readonly onFiltersChange: (filters: JobFilters) => void
}

export default function JobFiltersComponent({ filters, onFiltersChange }: JobFiltersProps) {
  const handleFilterChange = (key: keyof JobFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    // Don't consider default sorting as an active filter
    if (key === 'sortBy' && (value === 'date-desc' || value === undefined)) return false
    return value !== undefined && value !== ''
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Jobs
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by title, company, or description..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="min-w-[150px]">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="e.g., New York, Remote"
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="min-w-[150px]">
          <label htmlFor="job_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Type
          </label>
          <select
            id="job_type"
            value={filters.job_type || ''}
            onChange={(e) => handleFilterChange('job_type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="min-w-[180px]">
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <select
            id="sortBy"
            value={filters.sortBy || 'date-desc'}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="job-type">Job Type</option>
            <option value="company">Company A-Z</option>
            <option value="location">Location A-Z</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 underline"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
} 