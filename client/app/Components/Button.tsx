interface IButtonProps {
  children?: React.ReactNode;
  [x: string]: any;
  className?: string;
}

const Button = ({ children, className, ...props }: IButtonProps) => {
  return (
    <button
      className={`rounded-md bg-blue-default  px-4 py-2 text-white hover:bg-blue-dark focus:bg-blue-dark focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
