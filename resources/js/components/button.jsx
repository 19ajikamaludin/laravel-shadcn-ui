import { forwardRef } from 'react'

import { Spinner } from '@/components/spinner'
import { Button as BaseButton } from '@/components/ui/button'

const Button = forwardRef((props, ref) => {
    const { loading, variant, size, ...restProps } = props

    return (
        <BaseButton
            ref={ref}
            disabled={loading}
            variant={variant}
            size={size}
            {...restProps}
        >
            {loading ? (
                <div className="flex items-center gap-1">
                    <Spinner />
                    <span className="ml-2">loading...</span>
                </div>
            ) : (
                <>{props.children}</>
            )}
        </BaseButton>
    )
})

export { Button }
