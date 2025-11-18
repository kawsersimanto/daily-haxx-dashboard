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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  PollCategorySchema,
  PollCategorySchemaType,
} from "../../poll/poll.schema";
import {
  useGetPollCategoryByIdQuery,
  useUpdatePollCategoryMutation,
} from "../poll-category.api";

export const PollCategoryEditForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, isLoading: isLoadingCategory } =
    useGetPollCategoryByIdQuery(id);
  const [updateCategoryFn, { isLoading }] = useUpdatePollCategoryMutation();
  const form = useForm<PollCategorySchemaType>({
    resolver: zodResolver(PollCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  console.log(data?.name);

  useEffect(() => {
    if (data) {
      form.reset({
        name: data?.name,
      });
    }
  }, [data, form]);

  const onSubmit = async (values: PollCategorySchemaType) => {
    await handleMutationRequest(
      updateCategoryFn,
      { id, ...values },
      {
        loadingMessage: "Updating Poll Category",
        successMessage: (res: ApiResponse<string>) => res?.message,
        onSuccess: () => {
          router.push("/polls/categories");
        },
      }
    );
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
                <Input
                  placeholder="Pharmaceuticals"
                  type="text"
                  {...field}
                  disabled={isLoadingCategory}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading || isLoadingCategory}>
          {isLoading && <Spinner />}
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
