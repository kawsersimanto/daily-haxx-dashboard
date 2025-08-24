/**
 * Returns the list of visible page numbers for pagination.
 */
export const getVisiblePages = (
  totalPages: number,
  currentPage: number,
  maxVisible: number = 8
): number[] => {
  const pages: number[] = [];

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  let startPage = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - maxVisible + 1;
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

/**
 * Validates and returns a new page number if it's within range, otherwise returns null.
 */
export const getValidPage = (
  targetPage: number,
  currentPage: number,
  totalPages: number
): number | null => {
  return targetPage !== currentPage &&
    targetPage >= 1 &&
    targetPage <= totalPages
    ? targetPage
    : null;
};
