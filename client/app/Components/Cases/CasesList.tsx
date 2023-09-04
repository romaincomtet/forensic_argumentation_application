import FClient from "@/app/Api/FeathersClient";
import Button from "../Button";
import Modal from "../Modal/Modal";
import ModalCase from "../Modal/ModalCase";
import Pagination from "../Pagination/Pagination";
import Case from "./Case";
import React, { useState, useEffect, useCallback } from "react";
import { Cases } from "forensic-server";
import { useRouter } from "next/router";

interface ICasesListProps {}

const CasesList = ({}: ICasesListProps) => {
  const [cases, setCases] = useState<Cases[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const casesPerPage = 6;
  const [isModalOpen, setModalOpen] = useState(false);

  const findCases = useCallback(async () => {
    let payload: any = {
      query: {
        $sort: {
          updatedAt: -1,
        },
        $limit: casesPerPage,
        $skip: (currentPage - 1) * casesPerPage,
      },
    };
    if (search) {
      payload.query.caseName = { $ilike: search + "%" };
    }
    const cases = await FClient.service("cases").find(payload);
    if (cases.data) {
      setCases(cases.data);
      const totalPages = Math.ceil(cases.total / casesPerPage);
      setTotalPages(totalPages);
    }
  }, [currentPage, search]);

  useEffect(() => {
    findCases();
  }, [findCases]);

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-default">List of Cases</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by case Name..."
            className="rounded-md border border-grey-dark bg-grey-lightest px-4 py-2 focus:border-blue-default focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => setModalOpen(true)}>New case</Button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-6">
        {cases.map((caseData) => (
          <Case key={caseData.id} caseData={caseData} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />

      <ModalCase
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        refresh={findCases}
      ></ModalCase>
    </div>
  );
};

export default CasesList;
