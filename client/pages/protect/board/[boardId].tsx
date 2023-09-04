import BoardFigma from "@/app/Components/BoardFigma";
import Navbar from "@/app/Components/NavBar";
import { useRouter } from "next/router";

const BoardPage = () => {
  const router = useRouter();
  const { caseId } = router.query;

  return (
    <div className="min-w-screen flex min-h-screen flex-col bg-grey-light">
      <Navbar pageName="board" />
      <div className="flex flex-1">
        <BoardFigma />
        <div className="w-[20%]"></div>
      </div>
    </div>
  );
};

export default BoardPage;
