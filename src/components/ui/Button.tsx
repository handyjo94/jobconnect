'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Button variant styles using class-variance-authority for better type safety
const buttonVariants = cva(
  // Base classes applied to all buttons
  [
    'inline-flex items-center justify-center font-medium rounded-lg',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transition-all duration-200 cursor-pointer'
  ],
  {
    variants: {
      variant: {
        primary: [
          'text-white bg-gradient-to-r from-blue-600 to-blue-700',
          'hover:from-blue-700 hover:to-blue-800',
          'focus:ring-blue-500',
          'shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        ],
        secondary: [
          'text-gray-700 dark:text-gray-300',
          'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'focus:ring-blue-500',
          'shadow-md hover:shadow-lg'
        ],
        danger: [
          'text-white bg-red-600',
          'hover:bg-red-700',
          'focus:ring-red-500'
        ],
        ghost: [
          'text-gray-700 dark:text-gray-300',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'focus:ring-gray-500'
        ],
        outline: [
          'text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600',
          'bg-blue-50 dark:bg-blue-900/20',
          'hover:bg-blue-100 dark:hover:bg-blue-900/30',
          'focus:ring-blue-500'
        ],
        'outline-danger': [
          'text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600',
          'bg-red-50 dark:bg-red-900/20',
          'hover:bg-red-100 dark:hover:bg-red-900/30',
          'focus:ring-red-500'
        ],
        google: [
          'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700',
          'border border-gray-300 dark:border-gray-600',
          'hover:bg-gray-50 dark:hover:bg-gray-600',
          'focus:ring-blue-500 shadow-sm'
        ]
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-lg'
      },
      fullWidth: {
        true: 'w-full',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      loadingText = 'Loading...',
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants } 