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
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PollCategorySchema, PollCategorySchemaType } from "../poll.schema";
import { useCreatePollCategoryMutation } from "../pollCategory.api";

export const PollCategoryForm = () => {
  const router = useRouter();
  const [createCategoryFn, { isLoading }] = useCreatePollCategoryMutation();
  const form = useForm<PollCategorySchemaType>({
    resolver: zodResolver(PollCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: PollCategorySchemaType) => {
    await handleMutationRequest(createCategoryFn, values, {
      loadingMessage: "Creating Poll Category",
      successMessage: (res: ApiResponse<string>) => res?.message,
      onSuccess: () => {
        router.push("/polls/categories");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Pharmaceuticals" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner />
              Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};
