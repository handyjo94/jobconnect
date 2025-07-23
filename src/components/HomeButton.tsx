'use client'

import { LinkButton } from '@/components/ui/LinkButton'

interface HomeButtonProps {
  readonly className?: string
}

export default function HomeButton({ className = '' }: HomeButtonProps) {
  return (
    <LinkButton
      href="/"
      variant="secondary"
      size="md"
      className={className}
      leftIcon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      }
    >
      Home
    </LinkButton>
  )
} 