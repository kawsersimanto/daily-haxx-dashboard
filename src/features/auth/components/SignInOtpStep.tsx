"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";

import { OtpFormValues, otpSchema } from "@/features/auth/auth.schema";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { handleApiError } from "@/utils/handleApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSendOtpMutation, useVerifyOtpMutation } from "../auth.api";
import { nextStep, prevStep, setToken } from "../store/auth.slice";

export const SignInOtpStep = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.auth.email);

  const [sendOtp, { isLoading: isResendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
    mode: "onTouched",
  });

  const onSubmit = async (data: OtpFormValues) => {
    try {
      const res = await verifyOtp({ email, otp: data.otp }).unwrap();
      if (res?.success) {
        dispatch(setToken(res?.token));
        // dispatch(setUser(res?.user));
        toast.success(res?.message || "OTP verified successfully!");
        dispatch(nextStep());
      } else {
        toast.error(res?.message || "Invalid OTP");
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      const res = await sendOtp(email).unwrap();
      toast.success(res.message || "OTP sent successfully!");
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div>
      <div className="mb-[38px] px-5 text-center">
        <h2 className="text-[28px] mb-3.5 font-bold text-foreground">
          Verify your email
        </h2>
        <p className="sm:text-base text-sm">
          We sent a 6-digit verification code to{" "}
          <strong>{email || "Not Available"}</strong>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="justify-center">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    autoFocus={false}
                    {...field}
                  >
                    <InputOTPGroup className="md:gap-3.5 gap-2">
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="md:w-12 w-10 h-10 md:h-12 border border-border text-primary rounded"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          <div className="flex justify-center mt-7 gap-3.5 mb-7">
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(prevStep());
              }}
              variant={"outline"}
              className="md:text-lg text-sm font-medium h-auto py-2.5 border-primary text-primary grow"
            >
              Previous
            </Button>

            <Button
              disabled={!form.formState.isValid || isVerifying}
              type="submit"
              className="md:text-lg text-sm font-medium text-background h-auto py-2.5 grow"
            >
              {isVerifying ? <Spinner /> : "Verify"}
            </Button>
          </div>

          <div className="flex items-center justify-center flex-col">
            <p className="md:text-lg text-sm">Didn&apos;t receive the code?</p>
            <Button
              variant={"link"}
              className="h-auto p-0 font-semibold md:text-lg text-sm text-foreground"
              onClick={handleResend}
              disabled={isResendingOtp}
            >
              Resend code
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
