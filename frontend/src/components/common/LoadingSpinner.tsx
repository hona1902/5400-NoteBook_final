import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div
      data-testid="loading-spinner"
      className={cn('relative flex-shrink-0', sizeClasses[size], className)}
    >
      {/* Outer ring - faded primary */}
      <div className="absolute inset-0 rounded-full border-2 border-[#AE1C3F]/20" />
      {/* Spinning ring - primary color */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#AE1C3F] animate-spin" />
    </div>
  )
}
