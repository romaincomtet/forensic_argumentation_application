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
        className="my-2 block cursor-pointer text-grey-dark"
      >
        {label}
      </label>
      <input
        className={`w-full rounded-md border border-grey-dark bg-grey-lightest px-4 py-2 focus:border-blue-default focus:outline-none ${
          meta.touched && meta.error ? "border-red-default" : ""
        }`}
        id={props.id || props.name}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error my-1 text-red-default">{meta.error}</div>
      ) : null}
    </>
  );
};

export default MyTextInput;
