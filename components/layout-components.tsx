'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'tight' | 'normal' | 'loose'
  align?: 'start' | 'center' | 'end'
}

export function Stack({
  children,
  className,
  spacing = 'normal',
  align = 'start',
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        'flex flex-col',
        {
          'gap-2': spacing === 'tight',
          'gap-4': spacing === 'normal',
          'gap-6': spacing === 'loose',
          'items-start': align === 'start',
          'items-center': align === 'center',
          'items-end': align === 'end',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'tight' | 'normal' | 'loose'
  align?: 'start' | 'center' | 'end'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: boolean
}

export function Row({
  children,
  className,
  spacing = 'normal',
  align = 'center',
  justify = 'start',
  wrap = false,
  ...props
}: RowProps) {
  return (
    <div
      className={cn(
        'flex',
        {
          'flex-wrap': wrap,
          'flex-nowrap': !wrap,
          'gap-2': spacing === 'tight',
          'gap-4': spacing === 'normal',
          'gap-6': spacing === 'loose',
          'items-start': align === 'start',
          'items-center': align === 'center',
          'items-end': align === 'end',
          'justify-start': justify === 'start',
          'justify-center': justify === 'center',
          'justify-end': justify === 'end',
          'justify-between': justify === 'between',
          'justify-around': justify === 'around',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

