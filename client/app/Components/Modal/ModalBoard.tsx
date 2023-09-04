import React from "react";
import Modal from "./Modal";
import Button from "../Button";
import { useNotify } from "@/app/Provider/ToastProvider";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "../MyTextInput";
import FClient from "@/app/Api/FeathersClient";

interface IModalBoard {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
  caseId: number;
}

const ModalBoard = ({ isOpen, onClose, refresh, caseId }: IModalBoard) => {
  const { notifySuccess, notifyError } = useNotify();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Board Form">
      <Formik
        initialValues={{
          boardName: "",
        }}
        validationSchema={Yup.object({
          boardName: Yup.string()
            .max(60, "Must be 60 characters or less")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const worked = await FClient.service("boards").create({
              boardName: values.boardName,
              caseId: caseId,
            });
            if (worked) {
              notifySuccess("Board created successfully");
              setSubmitting(false);
              onClose();
              refresh();
            }
          } catch (error: any) {
            notifyError("Failed to create board");
            setSubmitting(false);
          }
        }}
      >
        <Form>
          <MyTextInput label="Board Name" name="boardName" type="text" />

          <Button className="mt-5" type="submit">
            Create Board
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default ModalBoard;
