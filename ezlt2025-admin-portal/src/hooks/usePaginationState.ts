import { useMemo, useRef, useState } from "react";

interface QueryParams {
    limit: number;
    page: number;
}

const usePaginationState = (count?: number) => {
    const [pagination, setPagination] = useState({
        page: 0, // Zero-based indexing for MUI
        pageSize: 100,
    });

    // Backend query params
    const queryParams: QueryParams = {
        limit: pagination.pageSize,
        page: pagination.page + 1, // Adjust for backend one-based indexing
    };

    // Ref for row count
    const rowCountRef = useRef(count || 0);

    // Memoize the row count
    const rowCount = useMemo(() => {
        if (count !== undefined) {
            rowCountRef.current = count;
        }
        return rowCountRef.current;
    }, [count]);

    return {
        pagination,
        setPagination,
        queryParams,
        rowCount
    };
};

export default usePaginationState;
