'use client'

import React from 'react'
import Link from 'next/link'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariants } from './Button'

export interface LinkButtonProps
  extends React.ComponentProps<typeof Link>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  external?: boolean
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      leftIcon,
      rightIcon,
      children,
      external = false,
      ...props
    },
    ref
  ) => {
    const linkProps = external
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
          ...props
        }
      : props

    return (
      <Link
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        {...linkProps}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Link>
    )
  }
)

LinkButton.displayName = 'LinkButton'

export { LinkButton } 