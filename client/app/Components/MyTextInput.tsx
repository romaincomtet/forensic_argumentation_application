import { useField } from "formik";

interface IMyTextInput {
  label: string;
  name: string;
  [x: string]: any;
}

const MyTextInput = ({ label, ...props }: IMyTextInput) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className="text-grey-dark my-2 block"
      >
        {label}
      </label>
      <input
        className={`border-grey-dark bg-grey-lightest focus:border-blue-default w-full rounded-md border px-4 py-2 focus:outline-none ${
          meta.touched && meta.error ? "border-red-default" : ""
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-default my-1">{meta.error}</div>
      ) : null}
    </>
  );
};

export default MyTextInput;
