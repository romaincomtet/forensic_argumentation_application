import Button from "../Button";

interface IPagination {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onChangePage }: IPagination) => {
  return (
    <div className="mt-6 flex items-center justify-center space-x-4">
      <Button
        onClick={() => onChangePage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={` ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-blue-dark"
        }`}
      >
        Previous
      </Button>

      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        onClick={() => onChangePage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage >= totalPages}
        className={`${
          currentPage >= totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-blue-dark"
        }`}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
