import FClient from "@/app/Api/FeathersClient";
import { Invitations } from "forensic-server";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import Pagination from "../Pagination/Pagination";
import { useAuth } from "@/app/Provider/AuthProvider";
import { useNotify } from "@/app/Provider/ToastProvider";

interface IInvitationListProps {}

// Container Component
export const InvitationList = ({}: IInvitationListProps) => {
  const { user } = useAuth();
  const { notifySuccess, notifyError } = useNotify();
  const [invitations, setInvitations] = useState<Invitations[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const casesPerPage = 20;
  const [filter, setFilter] = useState<Invitations["status"]>("pending");
  const filteredInvitations = invitations.filter(
    (invitation) => invitation.status === filter,
  );

  const findInvitations = useCallback(async () => {
    const cases = await FClient.service("invitations").find({
      query: {
        $sort: {
          createdAt: -1,
        },
        userId: user!.id,
        status: filter,
        $limit: casesPerPage,
        $skip: (currentPage - 1) * casesPerPage,
      },
    });
    if (cases.data) {
      setInvitations(cases.data);
      const totalPages = Math.ceil(cases.total / casesPerPage);
      setTotalPages(totalPages);
    }
  }, [currentPage, filter, user]);

  useEffect(() => {
    findInvitations();
  }, [findInvitations]);

  async function handleAccept(id: number) {
    try {
      await FClient.service("invitations").patch(id, {
        status: "accepted",
      });
      findInvitations();
      notifySuccess("Invitation accepted");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRefuse(id: number) {
    try {
      await FClient.service("invitations").patch(id, {
        status: "refused",
      });
      findInvitations();
      notifySuccess("Invitation refused");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-[45vh] w-1/2  flex-col justify-between rounded border bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-default">Invitations</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Invitations["status"])}
          className="rounded border bg-grey-lightest p-2"
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="refused">Refused</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Here, giving the container a specific max height to ensure overflow works */}
      <div className="flex max-h-[calc(45vh-150px)] flex-1 flex-col overflow-y-auto">
        {filteredInvitations.map((invitation) => (
          <InvitationRow
            key={invitation.id}
            invitation={invitation}
            handleAccept={handleAccept}
            handleRefuse={handleRefuse}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />
    </div>
  );
};

interface IInvitationRowProps {
  invitation: Invitations;
  handleAccept: (id: number) => void;
  handleRefuse: (id: number) => void;
}

const InvitationRow = ({
  invitation,
  handleAccept,
  handleRefuse,
}: IInvitationRowProps) => {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div>
        <span className="font-bold text-grey-default">Case:</span>{" "}
        {invitation.isManager ? "manager" : invitation.caseId}
      </div>
      <div>
        <span className="font-bold text-grey-default">Invited By:</span>{" "}
        {invitation.invitedBy}
      </div>
      <div className="flex items-center space-x-5">
        <p className="text-sm">
          <span className="text-base font-bold text-grey-default">Date:</span>{" "}
          {new Date(invitation.createdAt).toLocaleDateString()}
        </p>
        <div className={`font-bold ${getStatusColor(invitation.status)}`}>
          {invitation.status}
        </div>
        {invitation.status === "pending" && (
          <div className="flex space-x-2">
            <Button
              variant="success"
              onClick={() => handleAccept(invitation.id)}
            >
              Accept
            </Button>
            <Button
              variant="danger"
              onClick={() => handleRefuse(invitation.id)}
            >
              Refuse
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get color based on status
const getStatusColor = (status: Invitations["status"]) => {
  switch (status) {
    case "pending":
      return "text-yellow-default";
    case "accepted":
      return "text-green-default";
    case "refused":
      return "text-red-default";
    case "canceled":
      return "text-grey-dark";
    default:
      return "text-grey-default";
  }
};
