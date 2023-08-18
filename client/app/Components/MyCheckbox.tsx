import { useField } from "formik";

interface IMyCheckbox {
  label: string;
  name: string;
  children: React.ReactNode;
  [x: string]: any;
}

const MyCheckbox = ({ children, ...props }: IMyCheckbox) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className="flex items-center">
      <label className="checkbox-input text-grey-dark mr-2">
        <input
          type="checkbox"
          className="form-checkbox text-blue-default border-grey-dark bg-grey-lightest"
          {...field}
          {...props}
        />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error text-red-default mt-2">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyCheckbox;
