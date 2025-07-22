export interface Job {
  id: string
  title: string
  company: string
  description: string
  location: string
  job_type: 'Full-Time' | 'Part-Time' | 'Contract'
  user_id: string
  created_at: string
  updated_at: string
}

export interface JobFormData {
  title: string
  company: string
  description: string
  location: string
  job_type: 'Full-Time' | 'Part-Time' | 'Contract'
}

export interface JobFilters {
  location?: string
  job_type?: string
  search?: string
  sortBy?: 'date-desc' | 'date-asc' | 'job-type' | 'company' | 'location'
} 