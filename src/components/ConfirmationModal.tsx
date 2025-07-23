import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'

interface ConfirmationModalProps {
  readonly isOpen: boolean
  readonly title: string
  readonly message: string
  readonly confirmLabel?: string
  readonly cancelLabel?: string
  readonly confirmButtonVariant?: 'danger' | 'primary'
  readonly onConfirm: () => void
  readonly onCancel: () => void
  readonly isLoading?: boolean
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmButtonVariant = 'danger',
  onConfirm,
  onCancel,
  isLoading = false
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <Heading level={3} size="lg" weight="semibold" spacing="none">
            {title}
          </Heading>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg flex justify-end gap-3">
          <Button
            onClick={onCancel}
            disabled={isLoading}
            variant="ghost"
            size="sm"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            loading={isLoading}
            loadingText="Loading..."
            variant={confirmButtonVariant === 'danger' ? 'danger' : 'primary'}
            size="sm"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
} 