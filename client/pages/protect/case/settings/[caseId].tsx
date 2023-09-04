import FClient from "@/app/Api/FeathersClient";
import BoardsList from "@/app/Components/Boards/BoardsList";
import CaseMember from "@/app/Components/Case-member/CaseMember";
import CasesList from "@/app/Components/Cases/CasesList";
import Navbar from "@/app/Components/NavBar";
import { useNotify } from "@/app/Provider/ToastProvider";
import { fetchAllDataPaginated } from "@/app/Utils";
import { Boards, Cases } from "forensic-server";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const CasePage = () => {
  const router = useRouter();
  const { caseId } = router.query;
  const [caseInfo, setCaseInfo] = useState<Cases | undefined>(undefined);
  const [boards, setBoards] = useState<Boards[]>([]);
  const { notifyError } = useNotify();

  const getCase = useCallback(async () => {
    if (caseId) {
      try {
        const res = await FClient.service("cases").get(Number(caseId));
        if (!res.id) {
          throw new Error("Case not found");
        }
        const allBoards = await fetchAllDataPaginated<Boards>(
          FClient.service("boards").find.bind(FClient.service("boards")),
          {
            caseId: res.id,
          },
        );
        setCaseInfo(res);
        setBoards(allBoards);
      } catch (error) {
        notifyError("you don't have access to this case");
      }
    }
  }, [caseId, notifyError]);

  useEffect(() => {
    getCase();
  }, [getCase]);

  return (
    <div className="min-w-screen flex min-h-screen flex-col bg-grey-light">
      <Navbar pageName={`Setting of case: ${caseInfo?.caseName}`} />
      {caseInfo?.id && <CaseMember caseInfo={caseInfo!} boards={boards} />}
    </div>
  );
};

export default CasePage;
