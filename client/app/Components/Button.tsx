interface IButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "info" | "success" | "warning" | "danger";
  [x: string]: any;
}

const Button = ({ children, className, variant, ...props }: IButtonProps) => {
  const bgColor = getBackgroundColor(variant);

  return (
    <button
      className={`rounded-md ${bgColor} px-4 py-2 text-white hover:${getHoverColor(
        variant,
      )} focus:${getFocusColor(variant)} focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const getBackgroundColor = (variant: IButtonProps["variant"]) => {
  switch (variant) {
    case "info":
      return "bg-blue-default";
    case "success":
      return "bg-green-default";
    case "warning":
      return "bg-yellow-default";
    case "danger":
      return "bg-red-default";
    default:
      return "bg-blue-default";
  }
};

const getHoverColor = (variant: IButtonProps["variant"]) => {
  switch (variant) {
    case "info":
      return "hover:bg-blue-dark";
    case "success":
      return "hover:bg-green-dark";
    case "warning":
      return "hover:bg-yellow-dark";
    case "danger":
      return "hover:bg-red-dark";
    default:
      return "hover:bg-blue-dark";
  }
};

const getFocusColor = (variant: IButtonProps["variant"]) => {
  switch (variant) {
    case "info":
      return "focus:bg-blue-dark";
    case "success":
      return "focus:bg-green-dark";
    case "warning":
      return "focus:bg-yellow-dark";
    case "danger":
      return "focus:bg-red-dark";
    default:
      return "focus:bg-blue-dark";
  }
};

export default Button;
