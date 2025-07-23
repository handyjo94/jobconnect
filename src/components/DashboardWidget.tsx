interface DashboardWidgetProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  action?: {
    label: string
    href: string
  }
  className?: string
}

export default function DashboardWidget({ 
  title, 
  value, 
  icon, 
  trend, 
  action,
  className = "" 
}: DashboardWidgetProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            {trend && (
              <div className={`flex items-center text-sm ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <svg 
                  className={`w-4 h-4 mr-1 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10M17 17V7H7" />
                </svg>
                {trend.value}
              </div>
            )}
          </div>
        </div>
        {action && (
          <a
            href={action.href}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {action.label}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
} 