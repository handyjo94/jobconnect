'use client'

import { LinkButton, Icon } from '@/components/ui'

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
      leftIcon={<Icon name="home" size="sm" />}
    >
      Home
    </LinkButton>
  )
} 