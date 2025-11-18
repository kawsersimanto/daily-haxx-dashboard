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
import { useCreateCategoryMutation } from "../article-category.api";
import {
  ArticleCategorySchema,
  ArticleCategorySchemaType,
} from "../article-category.schema";

export const CreateCategoryForm = () => {
  const router = useRouter();
  const [createCategoryFn, { isLoading }] = useCreateCategoryMutation();
  const form = useForm<ArticleCategorySchemaType>({
    resolver: zodResolver(ArticleCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: ArticleCategorySchemaType) => {
    await handleMutationRequest(createCategoryFn, values, {
      loadingMessage: "Creating Article Category",
      successMessage: (res: ApiResponse<string>) => res?.message,
      onSuccess: () => {
        router.push("/articles/categories");
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
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
