import Image from "next/image";
import Link from "next/link";
import { createClient } from '@/utils/supabase/server'
import AuthButton from '@/components/auth/AuthButton'
import { LinkButton } from '@/components/ui/LinkButton'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="font-sans min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 p-1">
                <Image
                  src="/favicon.ico"
                  alt="JobConnect"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                JobConnect
              </span>
            </div>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Find Your Dream Job or{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Hire Top Talent
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Connect with opportunities that matter. Our platform brings together the best companies 
              and talented professionals in a seamless, secure environment.
            </p>

            {/* Main CTA Buttons - Always visible */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <LinkButton
                href="/jobs"
                variant="primary"
                size="xl"
                rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                  </svg>
                }
              >
                Browse Jobs
              </LinkButton>
              <LinkButton
                href={user ? "/jobs/new" : "/auth/login"}
                variant="secondary"
                size="xl"
                rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                Post a Job
              </LinkButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">10k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Job Seekers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide the tools and features you need to succeed in your job search or hiring process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Smart Job Matching
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Advanced algorithms match candidates with perfect opportunities based on skills, experience, and preferences.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Enterprise-grade security with Google OAuth ensures your data is protected and your privacy is maintained.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Built with Next.js and Supabase for optimal performance and real-time updates across all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get started in three simple steps and find your perfect match.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Sign Up & Create Profile
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Register with Google OAuth and build your professional profile with skills and experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Browse or Post Jobs
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Search through thousands of opportunities or post your job opening to attract top talent.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Connect & Succeed
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Apply to jobs or review applications, and start building successful professional relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied users who have found success on our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  SA
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">Sarah Anderson</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                &quot;Found my dream job in just 2 weeks! The platform made it so easy to connect with the right companies.&quot;
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  MJ
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">Michael Johnson</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">HR Director</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                &quot;We&apos;ve hired 15+ amazing developers through this platform. The quality of candidates is exceptional.&quot;
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  EC
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">Emily Chen</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                &quot;The user experience is fantastic. Clean, fast, and exactly what I needed for my job search.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who trust our platform for their career growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Link
                  href="/jobs"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200"
                >
                  Start Job Hunting
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-blue-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200"
                >
                  Access Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/get-started"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200"
                >
                  Get Started
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-blue-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2 p-1">
                  <Image
                    src="/favicon.ico"
                    alt="JobConnect"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  JobConnect
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Connecting talent with opportunity through innovative technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/jobs" className="hover:text-blue-600">Browse Jobs</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-600">My Dashboard</Link></li>
                <li><Link href="/profile" className="hover:text-blue-600">My Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">For Employers</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/jobs/new" className="hover:text-blue-600">Post a Job</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-600">Manage Jobs</Link></li>
                <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 JobConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
