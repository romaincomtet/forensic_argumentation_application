import React from "react";
import Modal from "./Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "../MyTextInput";
import Button from "../Button";
import FClient from "@/app/Api/FeathersClient";
import { useNotify } from "@/app/Provider/ToastProvider";

interface IModalMember {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
  caseId: number;
}

const ModalMember = ({ isOpen, onClose, refresh, caseId }: IModalMember) => {
  const { notifySuccess, notifyError } = useNotify();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Case Member Form">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const worked = await FClient.service("cases").inviteMember({
              id: caseId,
              email: values.email,
            });
            if (worked) {
              notifySuccess(
                "Case member invited successfully, waiting for user to accept invitation",
              );
              setSubmitting(false);
              onClose();
              refresh();
            }
          } catch (error: any) {
            notifyError("Failed to invite case member");
            if (error.message === "User already invited") {
              setFieldError("email", "User already invited");
            } else {
              setFieldError("email", "User not found");
            }
            setSubmitting(false);
          }
        }}
      >
        <Form>
          <MyTextInput label="Email of the user" name="email" type="email" />

          <Button className="mt-5" type="submit">
            Invite User
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default ModalMember;
