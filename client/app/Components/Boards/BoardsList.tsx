import { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import Board from "./Board";
import { Boards, Cases } from "forensic-server";
import FClient from "@/app/Api/FeathersClient";
import Pagination from "../Pagination/Pagination";
import ModalBoard from "../Modal/ModalBoard";

interface IBoardsList {
  caseInfo: Cases;
}

const BoardsList = ({ caseInfo }: IBoardsList) => {
  const [boards, setBoards] = useState<Boards[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const casesPerPage = 6;
  const [isModalOpen, setModalOpen] = useState(false);

  const getBoards = useCallback(async () => {
    // TODO: add search
    if (caseInfo.id) {
      const boards = await FClient.service("boards").find({
        query: {
          caseId: caseInfo.id,
          $limit: casesPerPage,
          $skip: (currentPage - 1) * casesPerPage,
        },
      });
      setBoards(boards.data);
    }
  }, [caseInfo, currentPage]);

  useEffect(() => {
    getBoards();
  }, [getBoards]);
  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-default">List of Boards</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by case Name..."
            className="rounded-md border border-grey-dark bg-grey-lightest px-4 py-2 focus:border-blue-default focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => setModalOpen(true)}>New boards</Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {boards.map((boardData) => (
          <Board key={boardData.id} boardData={boardData} caseInfo={caseInfo} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />

      <ModalBoard
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        refresh={getBoards}
        caseId={caseInfo.id}
      ></ModalBoard>
    </div>
  );
};

export default BoardsList;
