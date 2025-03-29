const Pagination = ({ currentPage, data, setCurrentPage }) => {
    return (
        <div className="max-w-xl mx-auto flex items-center justify-between pb-8">
            <p>
                Page{" "}
                <span className="text-center font-bold tracking-tight text-gray-900">
                    {currentPage}
                </span>{" "}
                of {data?.total_pages}
            </p>
            <div>
                {currentPage > 1 && (
                    <button
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="rounded-md w-20 bg-indigo-600 px-3 py-2 text-md/6 font-semibold capitalize text-white shadow-xs hover:cursor-pointer hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        prev
                    </button>
                )}

                {currentPage < data?.total_pages && (
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="rounded-md w-20 bg-indigo-600 px-3 py-2 text-md/6 font-semibold capitalize text-white shadow-xs hover:cursor-pointer hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Pagination;
