import Button from "@/app/Components/Button";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "@/app/Components/MyTextInput";
import { useNotify } from "@/app/Provider/ToastProvider";
import { useAuth } from "@/app/Provider/AuthProvider";
import { useRouter } from "next/router";
import MyCheckbox from "@/app/Components/MyCheckbox";
import FClient from "@/app/Api/FeathersClient";

export default function Register() {
  const { notifySuccess, notifyError } = useNotify();
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-grey-light">
      <div className="w-96 rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold text-blue-default">
          Register
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            isOrganisationUser: false,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters long")
              .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter",
              )
              .matches(/[0-9]/, "Password must contain at least one number")
              .matches(
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
                "Password must contain at least one special character",
              )
              .required("Password is required"),
            isOrganisationUser: Yup.boolean(),
          })}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const worked = await FClient.service("users").create({
                email: values.email,
                password: values.password,
                name: values.name,
                isOrganisationUser: values.isOrganisationUser,
              });
              if (worked) {
                notifySuccess("registered successfully, please login now");
                setSubmitting(false);
                router.push("/");
              }
            } catch (error: any) {
              notifyError("Failed to register");
              if (error.message.includes("email")) {
                setFieldError("email", "email already exists");
              }
              setSubmitting(false);
            }
          }}
        >
          <Form>
            <MyTextInput label="Name" name="name" type="text" />
            <MyTextInput label="Email" name="email" type="email" />
            <MyTextInput label="Password" name="password" type="password" />
            <MyCheckbox name="isOrganisationUser">
              Etes vous un manager de case
            </MyCheckbox>
            <Button type="submit">Register</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
