import FClient from "@/app/Api/FeathersClient";
import Button from "@/app/Components/Button";
import { InvitationList } from "@/app/Components/Invitations/InvitationList";
import MyCheckbox from "@/app/Components/MyCheckbox";
import MyTextInput from "@/app/Components/MyTextInput";
import Navbar from "@/app/Components/NavBar";
import { useAuth } from "@/app/Provider/AuthProvider";
import { useNotify } from "@/app/Provider/ToastProvider";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export default function Profile() {
  const { user, autoLogin } = useAuth();
  const { notifySuccess, notifyError } = useNotify();
  return (
    <div className="min-w-screen flex min-h-screen flex-col bg-grey-light">
      <Navbar pageName={"Profile"} />
      <div className="flex h-full w-full">
        <div className="flex w-1/2 flex-col rounded border bg-white p-4 shadow-lg">
          <Formik
            initialValues={{
              email: user?.email || "",
              password: "",
              name: user?.name || "",
              isOrganisationUser: user?.isOrganisationUser || false,
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
                ),
              isOrganisationUser: Yup.boolean(),
            })}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                let payload: any = {};

                if (values.email && values.email !== user!.email) {
                  payload.email = values.email;
                }
                if (values.name && values.name !== user!.name) {
                  payload.name = values.name;
                }
                if (
                  values.isOrganisationUser !== undefined &&
                  values.isOrganisationUser !== user!.isOrganisationUser
                ) {
                  payload.isOrganisationUser = values.isOrganisationUser;
                }
                if (values.password && values.password !== "") {
                  payload.password = values.password;
                }
                console.log(payload);
                if (Object.keys(payload).length === 0) {
                  notifyError("Nothing to update");
                  setSubmitting(false);
                  return;
                }
                const worked = await FClient.service("users").patch(
                  user!.id,
                  payload,
                );
                if (worked) {
                  notifySuccess("successfully updated");
                  autoLogin(true);
                  setSubmitting(false);
                }
              } catch (error: any) {
                notifyError("Failed to update");
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

              <Button className="mt-5" type="submit">
                update
              </Button>
            </Form>
          </Formik>
        </div>
        <InvitationList />
      </div>
    </div>
  );
}
