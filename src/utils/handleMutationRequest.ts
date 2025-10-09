/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "sonner";

/**
 * Universal RTK Query mutation handler with loading + success/error toasts.
 * @param mutationFn - The RTK mutation trigger (e.g., deleteCategoryFn)
 * @param args - Arguments to pass into the mutation
 * @param options - Customizable behavior
 */
export const handleMutationRequest = async <T, A>(
  mutationFn: (args: A) => any,
  args: A,
  options?: {
    loadingMessage?: string;
    successMessage?: string | ((res: T) => string);
    errorMessage?: string;
    onSuccess?: (res: T) => void;
    onError?: (message: string) => void;
  }
): Promise<T | null> => {
  const {
    loadingMessage = "Processing...",
    successMessage,
    errorMessage,
    onSuccess,
    onError,
  } = options || {};

  const toastId = toast.loading(loadingMessage);

  try {
    const res = await mutationFn(args).unwrap();

    // ✅ if your API returns { success, message }
    if ((res as any)?.success === false) {
      const message =
        (res as any)?.message || errorMessage || "Operation failed";
      toast.error(message, { id: toastId });
      onError?.(message);
      return null;
    }

    // ✅ success message (static or dynamic)
    const successMsg =
      typeof successMessage === "function"
        ? successMessage(res)
        : successMessage || (res as any)?.message || "Success!";
    toast.success(successMsg, { id: toastId });
    onSuccess?.(res);
    return res;
  } catch (error) {
    const message = handleApiError(error, false);
    toast.error(message || errorMessage || "Something went wrong", {
      id: toastId,
    });
    onError?.(message);
    return null;
  }
};
