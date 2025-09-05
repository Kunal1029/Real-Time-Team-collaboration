import { toast } from "sonner";

const toastService = {
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: "top-center",
    });
  },

  error: (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: "top-right",
    });
  },

  info: (message: string) => {
    toast.info(message, {
      duration: 3000,
      position: "top-right",
    });
  },

  loading: (message: string) => {
    toast.loading(message, {
      duration: 2000,
      position: "top-right",
    });
  },
};

export default toastService;
