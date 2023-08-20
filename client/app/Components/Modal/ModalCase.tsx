import React from "react";
import Modal from "./Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "../MyTextInput";
import Button from "../Button";
import FClient from "@/app/Api/FeathersClient";
import { useNotify } from "@/app/Provider/ToastProvider";

interface IModalCase {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
}

const ModalCase = ({ isOpen, onClose, refresh }: IModalCase) => {
  const { notifySuccess, notifyError } = useNotify();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Case Form">
      <Formik
        initialValues={{
          organisationName: "",
          caseName: "",
          caseNumber: "",
          email: "",
        }}
        validationSchema={Yup.object({
          organisationName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          caseName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          caseNumber: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const worked = await FClient.service("cases").create({
              organisationName: values.organisationName,
              caseName: values.caseName,
              caseNumber: values.caseNumber,
              email: values.email,
            });
            if (worked) {
              notifySuccess(
                "Case created successfully, waiting for user to accept invitation",
              );
              setSubmitting(false);
              onClose();
              refresh();
            }
          } catch (error: any) {
            notifyError("Failed to create case");
            if (error.message === "User email not found") {
              setFieldError("email", "User email not found");
            }
            setSubmitting(false);
          }
        }}
      >
        <Form>
          <MyTextInput
            label="Name of your organisation"
            name="organisationName"
            type="text"
          />
          <MyTextInput label="Name of case" name="caseName" type="text" />
          <MyTextInput label="Case Number" name="caseNumber" type="text" />
          <MyTextInput
            label="Email of the user in charge of the case"
            name="email"
            type="email"
          />

          <Button className="mt-5" type="submit">
            Create Case
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default ModalCase;
