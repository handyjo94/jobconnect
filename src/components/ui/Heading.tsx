'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Heading variant styles using class-variance-authority for better type safety
const headingVariants = cva(
  // Base classes applied to all headings
  [
    'leading-tight break-words'
  ],
  {
    variants: {
      level: {
        1: '', // Will be overridden by size
        2: '', 
        3: '',
        4: '',
        5: '',
        6: ''
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl'
      },
      weight: {
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold'
      },
      variant: {
        default: 'text-gray-900 dark:text-white',
        muted: 'text-gray-500 dark:text-gray-400',
        secondary: 'text-gray-600 dark:text-gray-400',
        error: 'text-red-600 dark:text-red-400',
        success: 'text-green-600 dark:text-green-400',
        warning: 'text-yellow-600 dark:text-yellow-400',
        info: 'text-blue-600 dark:text-blue-400'
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
      },
      spacing: {
        none: '',
        xs: 'mb-1',
        sm: 'mb-2',
        md: 'mb-4',
        lg: 'mb-6',
        xl: 'mb-8'
      },
      truncate: {
        true: 'truncate',
        false: ''
      },
      responsive: {
        true: 'sm:text-lg md:text-xl lg:text-2xl',
        false: ''
      }
    },
    defaultVariants: {
      level: 3,
      size: 'lg',
      weight: 'semibold',
      variant: 'default',
      align: 'left',
      spacing: 'sm',
      truncate: false,
      responsive: false
    },
    // Compound variants for smart defaults based on heading level
    compoundVariants: [
      // H1 defaults
      {
        level: 1,
        size: undefined, // When size is not specified
        class: 'text-3xl sm:text-4xl lg:text-5xl'
      },
      {
        level: 1,
        weight: undefined,
        class: 'font-bold'
      },
      // H2 defaults  
      {
        level: 2,
        size: undefined,
        class: 'text-2xl sm:text-3xl'
      },
      {
        level: 2,
        weight: undefined,
        class: 'font-bold'
      },
      // H3 defaults
      {
        level: 3,
        size: undefined,
        class: 'text-lg sm:text-xl'
      },
      // H4 defaults
      {
        level: 4,
        size: undefined,
        class: 'text-base sm:text-lg'
      },
      // H5 defaults
      {
        level: 5,
        size: undefined,
        class: 'text-sm sm:text-base'
      },
      // H6 defaults
      {
        level: 6,
        size: undefined,
        class: 'text-xs sm:text-sm'
      }
    ]
  }
)

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      level = 3,
      size,
      weight,
      variant,
      align,
      spacing,
      truncate,
      responsive,
      as,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the HTML element to render
    const Component = (as || `h${level}`) as React.ElementType

    return (
      <Component
        className={cn(
          headingVariants({ 
            level, 
            size, 
            weight, 
            variant, 
            align, 
            spacing, 
            truncate,
            responsive 
          }), 
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'

export { Heading, headingVariants } 