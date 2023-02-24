import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginate = ({ totalPages, paginate, currentPage }) => {
  return (
    <Pagination size="sm">
      {[...Array(parseInt(totalPages)).keys()].map((number) => (
        <Pagination.Item
          key={number}
          onClick={() => paginate(number)}
          active={number === currentPage}
          className={
            currentPage == number ? "page-number active" : "page-number"
          }
        >
          {number + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Paginate;
