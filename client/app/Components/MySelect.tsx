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
        className="text-grey-dark mb-2 block"
      >
        {label}
      </label>
      <select
        className={`border-grey-dark bg-grey-lightest focus:border-blue-default w-full rounded-md border px-4 py-2 focus:outline-none ${
          meta.touched && meta.error ? "border-red-default" : ""
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-default mt-2">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MySelect;
