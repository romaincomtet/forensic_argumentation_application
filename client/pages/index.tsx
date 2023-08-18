import Button from "@/app/Components/Button";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "@/app/Components/MyTextInput";
import { useNotify } from "@/app/Provider/ToastProvider";
import { useAuth } from "@/app/Provider/AuthProvider";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const { notifySuccess, notifyError } = useNotify();
  const router = useRouter();

  return (
    <div className="bg-grey-light flex min-h-screen items-center justify-center">
      <div className="w-96 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-blue-default mb-4 text-center text-2xl font-bold">
          Login
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            const worked = await login(values.email, values.password);
            if (worked) {
              notifySuccess("Logged in successfully");
              setSubmitting(false);
              router.push("/protect");
            } else {
              notifyError("Failed to log in");
              setSubmitting(false);
              setFieldError("password", "Invalid email or password");
            }
          }}
        >
          <Form>
            <MyTextInput label="Email" name="email" type="email" />
            <MyTextInput label="Password" name="password" type="password" />

            <Button type="submit">Login</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
