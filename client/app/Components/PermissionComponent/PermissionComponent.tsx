import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Boards, CaseMembers } from "forensic-server";
import Button from "../Button";
import { useNotify } from "@/app/Provider/ToastProvider";

export interface Permission {
  canRead: boolean;
  canEdit: boolean;
  canConfigure: boolean;
}

interface IPermissionComponentProps {
  permissions: Record<string, Partial<Permission>>;
  onChange: (permissions: Record<string, Partial<Permission>>) => void;
  boards: Boards[];
}

const PermissionComponent = ({
  permissions,
  onChange,
  boards,
}: IPermissionComponentProps) => {
  const [selectedBoard, setSelectedBoard] = useState<number | undefined>(
    undefined,
  );

  const { notifyError } = useNotify();
  const togglePermission = (key: string, field: keyof Permission) => {
    const newPermissions = { ...permissions };
    newPermissions[key][field] = !newPermissions[key][field];
    onChange(newPermissions);
  };

  const deletePermission = (key: string) => {
    const newPermissions = { ...permissions };
    delete newPermissions[key];
    onChange(newPermissions);
  };

  return (
    <div>
      <div className="flex items-center justify-end space-x-2">
        <label
          htmlFor={"selectPermission"}
          className="cursor-pointer text-grey-dark "
        >
          Board
        </label>
        <select
          id={"selectPermission"}
          className={`w-full rounded-md border border-grey-dark bg-grey-lightest px-4 py-2 focus:border-blue-default focus:outline-none`}
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(Number(e.target.value))}
        >
          <option value={undefined}>select a board</option>
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.boardName}
            </option>
          ))}
        </select>
        <Button
          variant="info"
          className="text-sm"
          onClick={() => {
            const newPermissions = { ...permissions };
            const select = boards.find((board) => board.id === selectedBoard);
            if (!select) {
              notifyError("Please select a board");
              return;
            }
            newPermissions[select.id.toString()] = {
              canRead: false,
              canEdit: false,
              canConfigure: false,
            };
            console.log(newPermissions);
            onChange(newPermissions);
          }}
          type="button"
        >
          Add new permission
        </Button>
      </div>

      {Object.keys(permissions).map((key, index) => (
        <div key={index} className="my-4 flex items-center justify-between">
          <span>
            {boards.find((item) => item.id === Number(key))?.boardName}:
          </span>
          <span
            className={`mx-2 ${
              permissions[key].canRead
                ? "text-green-default"
                : "text-red-default"
            }`}
            onClick={() => togglePermission(key, "canRead")}
          >
            canRead
          </span>
          <span
            className={`mx-2 ${
              permissions[key].canEdit
                ? "text-green-default"
                : "text-red-default"
            }`}
            onClick={() => togglePermission(key, "canEdit")}
          >
            canEdit
          </span>
          <span
            className={`mx-2 ${
              permissions[key].canConfigure
                ? "text-green-default"
                : "text-red-default"
            }`}
            onClick={() => togglePermission(key, "canConfigure")}
          >
            canConfigure
          </span>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deletePermission(key)}
            className="ml-4 cursor-pointer text-red-default"
          />
        </div>
      ))}
    </div>
  );
};

export default PermissionComponent;
