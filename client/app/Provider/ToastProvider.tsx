import { createContext, useContext, ReactNode } from "react";
import { toast } from "react-toastify";

interface ToastifyContextProps {
  notifyInfo: (message: string) => void;
  notifyWarning: (message: string) => void;
  notifyError: (message: string) => void;
  notifySuccess: (message: string) => void;
}

const ToastifyContext = createContext<ToastifyContextProps | undefined>(
  undefined,
);

interface ToastifyProviderProps {
  children: ReactNode;
}

export const ToastifyProvider: React.FC<ToastifyProviderProps> = ({
  children,
}) => {
  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyInfo = (message: string) => {
    toast.info(message);
  };

  const notifyWarning = (message: string) => {
    toast.warning(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  const value = {
    notifyInfo,
    notifyWarning,
    notifyError,
    notifySuccess,
  };

  return (
    <ToastifyContext.Provider value={value}>
      {children}
    </ToastifyContext.Provider>
  );
};

export const useNotify = (): ToastifyContextProps => {
  const context = useContext(ToastifyContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastifyProvider");
  }
  return context;
};
