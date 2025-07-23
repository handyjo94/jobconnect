import UserProfile from "@/components/UserProfile";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Page Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                User Profile
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your account information and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Profile Content */}
          <div className="space-y-6">
            <UserProfile />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
