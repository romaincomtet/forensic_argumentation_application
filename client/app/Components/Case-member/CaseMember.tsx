import FClient from "@/app/Api/FeathersClient";
import Button from "../Button";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";
import React, { useState, useEffect, useCallback } from "react";
import { Boards, CaseMembers, Cases } from "forensic-server"; // Please adjust the import based on your actual setup
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalMember from "../Modal/ModalMember";
import ListInvitationMember from "./ListInvitationMember";
import ModalMemberEdit from "../Modal/ModalMemberEdit";
import ConfirmationModal from "../Modal/ConfirmationModal";

interface IMembersListProps {
  caseInfo: Cases;
  boards: Boards[];
}

const MembersList = ({ caseInfo, boards }: IMembersListProps) => {
  const [members, setMembers] = useState<CaseMembers[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const membersPerPage = 6; // Adjust this value as per your requirements
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
  const [memberIdSelected, setMemberIdSelected] = useState<number | undefined>(
    undefined,
  );

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleDelete = async () => {
    if (memberIdSelected) {
      await FClient.service("case-members").managerRemoveMember({
        caseId: caseInfo.id,
        userId: memberIdSelected,
      });
      setIsModalConfirmationOpen(false);
      handleRefresh();
    }
  };

  const findMembers = useCallback(async () => {
    let payload: any = {
      query: {
        // $sort: {
        //   updatedAt: -1,
        // },
        caseId: caseInfo.id,
        $limit: membersPerPage,
        $skip: (currentPage - 1) * membersPerPage,
      },
    };
    if (search) {
      payload.query.name = { $ilike: search + "%" }; // Assuming members can be searched by name
    }
    const foundMembers = await FClient.service("case-members").find(payload); // Adjust the service name as per your setup
    if (foundMembers.data) {
      setMembers(foundMembers.data);
      const totalPages = Math.ceil(foundMembers.total / membersPerPage);
      setTotalPages(totalPages);
    }
  }, [currentPage, search, caseInfo]);

  useEffect(() => {
    findMembers();
  }, [findMembers, refresh]);

  return (
    <div className="w-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-default">
          List of Members
        </h2>
        <div className="flex items-center space-x-4">
          {/* TODO:search search buy user.name*/}
          {/* <input
            type="text"
            placeholder="Search by member name..."
            className="rounded-md border border-grey-dark bg-grey-lightest px-4 py-2 focus:border-blue-default focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          <Button onClick={() => setModalOpen(true)}>New Member</Button>
        </div>
      </div>
      <div className="divide-y divide-grey-light rounded-lg bg-white px-2">
        {members.map((memberData) => (
          <Member
            key={memberData.caseId + "_" + memberData.userId}
            member={memberData}
            setMemberIdSelected={setMemberIdSelected}
            setIsModalEditOpen={setIsModalEditOpen}
            setIsModalConfirmationOpen={setIsModalConfirmationOpen}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />
      <ListInvitationMember caseId={caseInfo.id} refresh={refresh} />
      <ModalMember
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        refresh={handleRefresh}
        caseId={caseInfo.id}
      />
      <ModalMemberEdit
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        refresh={handleRefresh}
        caseMember={members.find(
          (member) => member.userId === memberIdSelected,
        )}
        boards={boards}
      />
      <ConfirmationModal
        isOpen={isModalConfirmationOpen}
        onClose={() => setIsModalConfirmationOpen(false)}
        onConfirm={handleDelete}
        titleModal="Are you sure you want to delete this member ?"
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
      />
    </div>
  );
};

interface IMemberProps {
  member: CaseMembers;
  setMemberIdSelected: (index: number) => void;
  setIsModalEditOpen: (value: boolean) => void;
  setIsModalConfirmationOpen: (value: boolean) => void;
}

const Member = ({
  member,
  setMemberIdSelected,
  setIsModalEditOpen,
  setIsModalConfirmationOpen,
}: IMemberProps) => {
  return (
    <div className="flex items-center justify-between px-2 py-3">
      <div className="flex space-x-3">
        <p className="text-blue-default">{member.user?.name}</p>
        <p className="text-grey-dark">{member.user?.email}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button className="rounded-full bg-blue-light p-2 transition duration-300 ease-in-out hover:bg-blue-dark">
          <FontAwesomeIcon
            icon={faEdit}
            className="text-white"
            onClick={() => {
              setMemberIdSelected(member.userId);
              setIsModalEditOpen(true);
            }}
          />
        </button>
        <button className="hover:bg-red-dark rounded-full bg-red-default p-2 transition duration-300 ease-in-out">
          <FontAwesomeIcon
            icon={faTrash}
            className="text-white"
            onClick={() => {
              setMemberIdSelected(member.userId);
              setIsModalConfirmationOpen(true);
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default MembersList;
