import { useField } from "formik";

interface IMyCheckbox {
  name: string;
  children: React.ReactNode;
  [x: string]: any;
}

const MyCheckbox = ({ children, ...props }: IMyCheckbox) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className="my-2 flex items-center">
      <input
        type="checkbox"
        id={props.id || props.name}
        className="form-checkbox border-grey-dark bg-grey-lightest text-blue-default"
        {...field}
        {...props}
      />
      <label
        htmlFor={props.id || props.name}
        className="checkbox-input ml-2 cursor-pointer  text-grey-dark"
      >
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error mt-2 text-red-default">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyCheckbox;
