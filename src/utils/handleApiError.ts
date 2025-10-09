import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

interface ApiErrorResponse {
  message?: string;
  errorSources?: { path: string; message: string }[];
}

/**
 * Handles RTK Query errors gracefully and optionally shows a toast.
 * Supports both FetchBaseQueryError and SerializedError formats.
 */
export const handleApiError = (error: unknown, showToast = true): string => {
  let message = "Something went wrong";

  // ✅ RTK Query FetchBaseQueryError (network / API response errors)
  if (isFetchBaseQueryError(error)) {
    const err = error as FetchBaseQueryError;
    if ("data" in err && err.data) {
      const data = err.data as ApiErrorResponse;
      message =
        data.message ||
        data.errorSources?.[0]?.message ||
        JSON.stringify(data) ||
        message;
    } else if ("error" in err && typeof err.error === "string") {
      message = err.error;
    }
  }

  // ✅ RTK Query SerializedError (unexpected JS or query-level errors)
  else if (isSerializedError(error)) {
    message = error.message || message;
  }

  // ✅ Generic fallback
  else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  if (showToast) {
    toast.error(message);
  }

  return message;
};

// Type guards
function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error !== null &&
    ("status" in error || "data" in error)
  );
}

function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === "object" && error !== null && "message" in error;
}
