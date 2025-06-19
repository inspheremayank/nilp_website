'use client';

import Link from 'next/link';

const Pagination = ({ searchParams, router, currentPage, pageInfo }: any) => {
  const changeQueryParameter = (key: any, value: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    router.push(`?${params.toString()}`, { scroll: false });
  };
  const totalPages = pageInfo.total_page;

  const getStartPage = (currentPage: any) => {
    if (currentPage <= 5) {
      return 1;
    }
    if (currentPage + 4 >= totalPages) {
      console.log(Math.max(totalPages - 9, 1));
      return Math.max(totalPages - 9, 1);
    } 
    console.log(Math.floor((currentPage - 1) / 5) * 5 + 1);

    return Math.floor((currentPage - 1) / 5) * 5 + 1;
  };


  const startPage = getStartPage(currentPage);
  const endPage = Math.min(startPage + 9, totalPages);

  const handleClick = (pageNumber:any) => {
    changeQueryParameter('page', `${pageNumber}`);
  };

  return (
    <>
      <div className="pagination_container">
        <nav className='pagination_wrapper'>
          <ul className="pagination">
            <li className="page-item">
              <button className={`page-link ${currentPage == 1 ? 'disabled' : ''}`}
                onClick={() => changeQueryParameter('page', `${currentPage - 1}`)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length:  endPage - startPage + 1 }, (_, index) => {
              const pageNumber = startPage + index;
              return(
              <li className="page-item" key={index}>
                <button className={`page-link ${currentPage == pageNumber ? 'active' : ''}`} onClick={() => handleClick(pageNumber)}>
                  {pageNumber}
                </button>
              </li>
            )})}
            <li className="page-item">
              <button className={`page-link ${pageInfo.total_page == currentPage ? 'disabled' : ''}`}
                onClick={() => changeQueryParameter('page', `${currentPage + 1}`)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
