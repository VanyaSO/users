import {Pagination as PaginationBs} from 'react-bootstrap';

type PaginationProps = {
    className?: string;
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export const Pagination = ({className, currentPage, totalPages, onChange}: PaginationProps) => {
    if (totalPages <= 1) return null;

    const handleChange = (page: number) => {
        onChange(page);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <PaginationBs className={className}>
            {Array
                .from({length: totalPages}, (_, i) => i + 1)
                .map((page) => (
                    <PaginationBs.Item key={page} active={currentPage === page} onClick={() => handleChange(page)}>{page}</PaginationBs.Item>
                ))
            }
        </PaginationBs>
    )
}