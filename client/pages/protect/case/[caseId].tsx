import FClient from "@/app/Api/FeathersClient";
import BoardsList from "@/app/Components/Boards/BoardsList";
import CasesList from "@/app/Components/Cases/CasesList";
import Navbar from "@/app/Components/NavBar";
import { useNotify } from "@/app/Provider/ToastProvider";
import { Boards, Cases } from "forensic-server";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const sampleCases = [
  { Id: 1, Preview: "/caseImage.png", caseName: "Case 1" },
  { Id: 2, Preview: "/caseImage.png", caseName: "Case 2" },
  // ... add more cases as needed
];

const sampleBoards = [
  {
    Id: 1,
    Preview: "/caseImage.png",
    boardName: "Board 1",
    caseName: "Case 1",
  },
  {
    Id: 2,
    Preview: "/caseImage.png",
    boardName: "Board 2",
    caseName: "Case 2",
  },
  // ... add more boards as needed
];

const CasePage = () => {
  const router = useRouter();
  const { caseId } = router.query;
  const [caseInfo, setCaseInfo] = useState<Cases | undefined>(undefined);
  const { notifyError } = useNotify();

  const getCaseAndBoards = useCallback(async () => {
    if (caseId) {
      try {
        const res = await FClient.service("cases").get(Number(caseId));
        setCaseInfo(res);
      } catch (error) {
        notifyError("you don't have access to this case");
      }
    }
  }, [caseId, notifyError]);

  useEffect(() => {
    getCaseAndBoards();
  }, [getCaseAndBoards]);

  return (
    <div className="min-w-screen flex min-h-screen flex-col bg-grey-light">
      <Navbar pageName="Case Dashboard" />
      {caseInfo?.id && <BoardsList caseInfo={caseInfo!} />}
    </div>
  );
};

export default CasePage;
