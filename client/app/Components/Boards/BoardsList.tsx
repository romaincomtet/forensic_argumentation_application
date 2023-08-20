import Button from "../Button";
import Board from "./Board";

interface IBoardsList {
  boards: {
    Id: number;
    Preview: string;
    boardName: string;
    caseName: string;
  }[];
}

const BoardsList = ({ boards }: IBoardsList) => {
  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-default">List of Boards</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search boards..."
            className="rounded-md border border-grey-dark bg-grey-lightest px-4 py-2 focus:border-blue-default focus:outline-none"
          />
          <Button>New Board</Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {boards.map((boardData) => (
          <Board key={boardData.Id} boardData={boardData} />
        ))}
      </div>
    </div>
  );
};

export default BoardsList;
