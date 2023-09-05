import React, { useEffect } from "react";
import Modal from "./Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import MyTextInput from "../MyTextInput";
import Button from "../Button";
import FClient from "@/app/Api/FeathersClient";
import { useNotify } from "@/app/Provider/ToastProvider";
import { Boards, CaseMembers } from "forensic-server";
import PermissionComponent, {
  Permission,
} from "../PermissionComponent/PermissionComponent";

interface IModalMemberEdit {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
  caseMember: CaseMembers | undefined;
  boards: Boards[];
}

const ModalMemberEdit = ({
  isOpen,
  onClose,
  refresh,
  caseMember,
  boards,
}: IModalMemberEdit) => {
  const { notifySuccess, notifyError } = useNotify();

  const formik = useFormik({
    initialValues: {
      permissionJson:
        (caseMember?.permissionJson as Record<string, Partial<Permission>>) ||
        {},
    },
    validationSchema: Yup.object({
      permissionJson: Yup.object().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log(values.permissionJson);
        const worked = await FClient.service("cases").editPermissionMember({
          caseId: caseMember!.caseId,
          userId: caseMember!.userId,
          permissionJson: values.permissionJson,
        });
        if (worked) {
          notifySuccess("Case member permission updated successfully");
          setSubmitting(false);
          onClose();
          refresh();
        }
      } catch (error: any) {
        notifyError(`Failed to edit user permission ${error.message}`);
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue(
      "permissionJson",
      (caseMember?.permissionJson as Record<string, Partial<Permission>>) || {},
    );
  }, [caseMember]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit member ${caseMember?.user?.name}`}
    >
      <form onSubmit={formik.handleSubmit}>
        <PermissionComponent
          permissions={formik.values.permissionJson}
          onChange={(permissions) =>
            formik.setFieldValue("permissionJson", permissions)
          }
          boards={boards}
        />

        <Button className="mt-5" type="submit">
          Validate permission
        </Button>
      </form>
    </Modal>
  );
};

export default ModalMemberEdit;
