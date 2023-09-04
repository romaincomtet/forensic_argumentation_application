import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Boards, Cases } from "forensic-server";
import { useRouter } from "next/router";

interface IBoardProps {
  boardData: Boards;
  caseInfo: Cases;
}

const Board = ({ boardData, caseInfo }: IBoardProps) => {
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push(`/protect/board/${boardData.id}`)}
    >
      <Image
        // src={boardData.Preview}
        src={"/caseImage.png"}
        alt={boardData.boardName}
        width={400}
        height={300}
        className="rounded-lg shadow-md transition-shadow duration-200 hover:shadow-lg"
      />
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded bg-black bg-opacity-50 px-2 font-medium text-white">
        {caseInfo.caseName}/{boardData.boardName}
      </p>
      <FontAwesomeIcon
        icon={faCog}
        className="absolute right-2 top-2 cursor-pointer text-white"
      />
    </div>
  );
};

export default Board;
