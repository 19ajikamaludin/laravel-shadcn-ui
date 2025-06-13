import { Spinner } from './spinner'

export function SpinnerTable({ className }) {
    return (
        <div className="mt-3 flex h-36 w-full items-center justify-center gap-4">
            <Spinner className="h-8 w-8" />
            <span>Loading</span>
        </div>
    )
}
