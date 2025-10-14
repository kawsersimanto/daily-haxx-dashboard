"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { handleApiError } from "@/utils/handleApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSendOtpMutation } from "../auth.api";
import { EmailFormValues, emailSchema } from "../auth.schema";
import { nextStep, setEmail } from "../store/auth.slice";

export const SignInEmailStep = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.auth.email);
  const [sendOtp, { isLoading: isSending }] = useSendOtpMutation();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    try {
      dispatch(setEmail(data.email));
      const res = await sendOtp(data.email).unwrap();
      toast.success(res.message || "Verification code sent!");
      dispatch(nextStep());
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-[38px] px-5">
        <h2 className="text-[28px] mb-3.5 font-bold text-foreground text-center">
          Welcome to the Dashboard
        </h2>
        <p className="text-center sm:text-base text-sm">
          Enter your email address to <strong>Log in</strong>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-lg text-sm text-foreground">
                  Email Address
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="h-auto py-2.5 px-5 md:!text-base text-sm"
                    />
                  </FormControl>
                  <Image
                    src={"/mail-2.svg"}
                    width={20}
                    height={16}
                    className="absolute top-1/2 -translate-y-1/2 right-[10px] object-contain w-[20px] h-[16px] pointer-events-none"
                    alt="Form Icon"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSending}
            className="w-full md:mt-5 mt-4 md:text-lg text-sm font-medium text-background h-auto py-2.5"
          >
            {isSending ? (
              <>
                <Spinner className="w-4 h-4" /> Sending
              </>
            ) : (
              "Next"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
