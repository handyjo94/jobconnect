import { createClient } from '@/utils/supabase/client'
import type { Job, SavedJob, JobFormData, JobFilters } from './types'

export class JobService {
  private readonly supabase = createClient()

  async getAllJobs(filters?: JobFilters): Promise<Job[]> {
    let query = this.supabase
      .from('jobs')
      .select('*')

    // Apply filters
    if (filters?.job_type) {
      query = query.eq('job_type', filters.job_type)
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,company.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    // Apply sorting
    const sortBy = filters?.sortBy || 'date-desc'
    switch (sortBy) {
      case 'date-asc':
        query = query.order('created_at', { ascending: true })
        break
      case 'job-type':
        query = query.order('job_type', { ascending: true }).order('created_at', { ascending: false })
        break
      case 'company':
        query = query.order('company', { ascending: true }).order('created_at', { ascending: false })
        break
      case 'location':
        query = query.order('location', { ascending: true }).order('created_at', { ascending: false })
        break
      case 'date-desc':
      default:
        query = query.order('created_at', { ascending: false })
        break
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching jobs:', error)
      throw error
    }

    return data || []
  }

  async getJobById(id: string): Promise<Job | null> {
    const { data, error } = await this.supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching job:', error)
      return null
    }

    return data
  }

  async getUserJobs(userId: string): Promise<Job[]> {
    const { data, error } = await this.supabase
      .from('jobs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user jobs:', error)
      throw error
    }

    return data || []
  }

  async createJob(jobData: JobFormData): Promise<Job> {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error } = await this.supabase
      .from('jobs')
      .insert({
        ...jobData,
        user_id: user.id
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating job:', error)
      throw error
    }

    return data
  }

  async updateJob(id: string, jobData: Partial<JobFormData>): Promise<Job> {
    const { data, error } = await this.supabase
      .from('jobs')
      .update({
        ...jobData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating job:', error)
      throw error
    }

    return data
  }

  async deleteJob(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('jobs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting job:', error)
      throw error
    }
  }

  // Saved Jobs functionality
  async getSavedJobs(): Promise<SavedJob[]> {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error } = await this.supabase
      .from('saved_jobs')
      .select(`
        saved_at,
        jobs!inner (
          id,
          title,
          company,
          description,
          location,
          job_type,
          user_id,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', user.id)
      .order('saved_at', { ascending: false })

    if (error) {
      console.error('Error fetching saved jobs:', error)
      throw error
    }

    // Transform the data to return SavedJob objects with saved metadata
    return (data || []).map(item => ({
      ...(item.jobs as unknown as Job),
      saved_at: item.saved_at
    }))
  }

  async isJobSaved(jobId: string): Promise<boolean> {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) {
      return false
    }

    const { data, error } = await this.supabase
      .from('saved_jobs')
      .select('id')
      .eq('user_id', user.id)
      .eq('job_id', jobId)
      .single()

    return !error && data !== null
  }

  async saveJob(jobId: string): Promise<void> {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { error } = await this.supabase
      .from('saved_jobs')
      .insert({
        user_id: user.id,
        job_id: jobId
      })

    if (error) {
      console.error('Error saving job:', error)
      throw error
    }
  }

  async unsaveJob(jobId: string): Promise<void> {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { error } = await this.supabase
      .from('saved_jobs')
      .delete()
      .eq('user_id', user.id)
      .eq('job_id', jobId)

    if (error) {
      console.error('Error unsaving job:', error)
      throw error
    }
  }

  async toggleSaveJob(jobId: string): Promise<boolean> {
    const isSaved = await this.isJobSaved(jobId)
    
    if (isSaved) {
      await this.unsaveJob(jobId)
      return false
    } else {
      await this.saveJob(jobId)
      return true
    }
  }
}

export const jobService = new JobService() 