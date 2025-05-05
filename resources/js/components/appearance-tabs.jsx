import { cn } from '@/lib/utils'
import { Monitor, Moon, Sun } from 'lucide-react'

import { useAppearance } from '@/hooks/use-appearance'

export default function AppearanceToggleTab({ className = '', ...props }) {
    const { appearance, updateAppearance } = useAppearance()

    const tabs = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ]

    return (
        <div
            className={cn(
                'inline-flex rounded-lg p-1', //bg-neutral-100  dark:bg-neutral-800
                className
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3 py-1.5 transition-colors',
                        appearance === value
                            ? 'bg-neutral-100 shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60'
                    )}
                >
                    <Icon className="-ml-1 h-3 w-3" />
                    <span className="ml-1.5 text-xs text-center">{label}</span>
                </button>
            ))}
        </div>
    )
}
