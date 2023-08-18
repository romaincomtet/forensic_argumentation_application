interface IButtonProps {
  children?: React.ReactNode;
  [x: string]: any;
  className?: string;
}

const Button = ({ children, className, ...props }: IButtonProps) => {
  return (
    <button
      className="bg-blue-default hover:bg-blue-dark focus:bg-blue-dark mt-5 w-full rounded-md px-4 py-2 text-white focus:outline-none"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
