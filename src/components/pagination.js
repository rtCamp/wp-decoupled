import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function Pagination({ paginationInfo }) {
    const router = useRouter();

    if (!paginationInfo?.total || paginationInfo.total <= paginationInfo.perPage) {
        return null;
    }

    let currentPage = parseInt(router?.query?.page);
    if (isNaN(currentPage) || !currentPage) {
        currentPage = 1;
    }

    function getPagesCount() {
        const { perPage, total } = paginationInfo;
        let pagesCount = Math.floor(total / perPage);
        if (total % perPage) {
            pagesCount++;
        }
        return pagesCount;
    }

    const pagesCount = getPagesCount();

    if (pagesCount < 2) {
        return null;
    }

    const pagesArray = Array(pagesCount).fill(0);

    return (
        <ul className="wd-pagination">
            {currentPage > 1 && (
                <li>
                    <Link href={`/products/${currentPage - 1}`}>
                        <a>Prev</a>
                    </Link>
                </li>
            )}

            {pagesArray.map((_, index) => {
                const page = index + 1;
                return (
                    <li key={page}>
                        {page === currentPage ? (
                            <span>{page}</span>
                        ) : (
                            <Link href={`/products/${page}`}>
                                <a>{page}</a>
                            </Link>
                        )}
                    </li>
                );
            })}

            {currentPage < pagesArray.length && (
                <li>
                    <Link href={`/products/${currentPage + 1}`}>
                        <a>Next</a>
                    </Link>
                </li>
            )}
        </ul>
    );
}

Pagination.propTypes = {
    paginationInfo: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            perPage: PropTypes.number,
            hasMore: PropTypes.bool,
            hasPrevious: PropTypes.bool,
            total: PropTypes.number
        })
    ])
};
