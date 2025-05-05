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
                    <>
                        {order.direction === 'desc' ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronUp className="w-4 h-4" />
                        )}
                    </>
                ) : (
                    <ChevronsUpDown className="w-4 h-4" />
                )}
            </div>
        </div>
    )
}

export { TableHeadOrder }
