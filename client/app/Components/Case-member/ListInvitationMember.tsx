import { Invitations } from "forensic-server";
import Pagination from "../Pagination/Pagination";
import { useCallback, useEffect, useState } from "react";
import FClient from "@/app/Api/FeathersClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface IListInvitationMemberProps {
  caseId: number;
  refresh: boolean;
}

const ListInvitationMember = ({
  caseId,
  refresh,
}: IListInvitationMemberProps) => {
  const [invitations, setInvitations] = useState<Invitations[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const membersPerPage = 5; // Adjust this value as per your requirements

  const findInvitationMember = useCallback(async () => {
    let payload: any = {
      query: {
        // $sort: {
        //   updatedAt: -1,
        // },
        caseId: caseId,
        status: "pending",
        $limit: membersPerPage,
        $skip: (currentPage - 1) * membersPerPage,
      },
    };
    const invitationRes = await FClient.service("invitations").find(payload); // Adjust the service name as per your setup
    if (invitationRes.data) {
      setInvitations(invitationRes.data);
      const totalPages = Math.ceil(invitationRes.total / membersPerPage);
      setTotalPages(totalPages);
    }
  }, [currentPage, caseId]);

  useEffect(() => {
    findInvitationMember();
  }, [findInvitationMember, refresh]);

  return (
    <>
      <div className="my-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-default">
          List of invitations in pending
        </h2>
      </div>
      <div className="divide-y divide-grey-light rounded-lg bg-white px-2">
        {invitations.map((invitationData) => (
          <InvitationComponent
            key={invitationData.id}
            invitation={invitationData}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />
    </>
  );
};

interface IInvitationComponentProps {
  invitation: Invitations;
}

const InvitationComponent = ({ invitation }: IInvitationComponentProps) => {
  return (
    <div className="flex items-center justify-between px-2 py-3">
      <div className="flex space-x-3">
        <p className="text-blue-default">{invitation.user?.name}</p>
        <p className="text-grey-dark">{invitation.user?.email}</p>
      </div>
      <div className="flex items-center space-x-2">
        {invitation.isManager && <p className="text-grey-dark">Manager</p>}
        <p className="text-yellow-default">{invitation.status}</p>

        <button className="hover:bg-red-dark rounded-full bg-red-default p-2 transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faTrash} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ListInvitationMember;
