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
import {
  ArticleCategorySchema,
  ArticleCategorySchemaType,
} from "@/features/article/article.schema";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/features/article/articleCategory.api";
import { handleApiError } from "@/utils/handleApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const CategoryEditForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, isLoading: isLoadingCategory } = useGetCategoryByIdQuery(id);
  const [updateCategoryFn, { isLoading }] = useUpdateCategoryMutation();
  const form = useForm<ArticleCategorySchemaType>({
    resolver: zodResolver(ArticleCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data?.data?.name,
      });
    }
  }, [data, form]);

  const onSubmit = async (values: ArticleCategorySchemaType) => {
    try {
      const res = await updateCategoryFn({ id, ...values }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        router.push("/articles/categories");
      } else {
        toast.error(res?.message);
      }
      console.log(res);
    } catch (error) {
      handleApiError(error);
    }
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
