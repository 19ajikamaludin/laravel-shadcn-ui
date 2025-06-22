import { cn } from '@/lib/utils'
import { LucideLoaderCircle } from 'lucide-react'

export function Spinner({ className }) {
    return <LucideLoaderCircle className={cn('animate-spin', className)} />
}
