import { useField } from "formik";

interface IMySelect {
  label: string;
  name: string;
  [x: string]: any;
}

const MySelect = ({ label, ...props }: IMySelect) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="mb-2 block cursor-pointer text-grey-dark "
      >
        {label}
      </label>
      <select
        id={props.id || props.name}
        className={`w-full rounded-md border border-grey-dark bg-grey-lightest px-4 py-2 focus:border-blue-default focus:outline-none ${
          meta.touched && meta.error ? "border-red-default" : ""
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error mt-2 text-red-default">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MySelect;
