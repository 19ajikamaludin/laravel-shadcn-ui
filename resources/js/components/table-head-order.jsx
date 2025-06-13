import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react'

const TableHeadOrder = ({ children, onClick, order, column, className }) => {
    return (
        <div
            className={`flex flex-row items-center gap-2 ${className ?? ''}`}
            onClick={() => onClick(column)}
        >
            <div>{children}</div>
            <div>
                {order.column === column ? (
                    <>{order.direction === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}</>
                ) : (
                    <ChevronsUpDown className="h-4 w-4" />
                )}
            </div>
        </div>
    )
}

export { TableHeadOrder }
