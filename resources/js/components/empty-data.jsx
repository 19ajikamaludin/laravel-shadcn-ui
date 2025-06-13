export function EmptyData({ data }) {
    return (
        <>
            {data.length <= 0 && (
                <div className="my-6 flex w-full items-center justify-center">
                    <div className="text-sm font-thin text-gray-600">Data tidak tersedia</div>
                </div>
            )}
        </>
    )
}
