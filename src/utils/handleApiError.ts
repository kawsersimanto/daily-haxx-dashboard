import { ApiErrorResponse } from "@/types";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const handleApiError = (error: unknown, showToast = true): string => {
  let message = "Something went wrong";

  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    message =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.errorSources?.[0]?.details ||
      axiosError.message ||
      message;

    if (!showToast) console.error("API Error:", axiosError.response?.data);
  } else if (error instanceof Error) {
    message = error.message;
    if (!showToast) console.error("Error:", error);
  } else {
    if (!showToast) console.error("Unknown error:", error);
  }

  if (showToast) {
    toast.error(message);
  }

  return message;
};
