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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadImage } from "@/components/upload-image/UploadImage";
import { useGetCategoriesQuery } from "@/features/article-category/article-category.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  useDeleteImageByUrlMutation,
  useUploadSingleImageMutation,
} from "@/features/image/image.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArticleSchema, ArticleSchemaType } from "../article.schema";
import { ArticleFormSkeleton } from "./ArticleFormSkeleton";

export const ArticleForm = () => {
  const { profile } = useAuth();
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery({ page: 1, limit: 50 });
  const uploadMutation = useUploadSingleImageMutation();
  const deleteMutation = useDeleteImageByUrlMutation();

  const categories = categoriesData?.data?.data;

  const form = useForm<ArticleSchemaType>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: {
      title: "",
      body: "",
      categoryId: "",
      companyName: "",
      coverImage: "",
      userId: "",
    },
  });

  useEffect(() => {
    if (!profile) return;

    form.reset({
      userId: profile?.id || "",
    });
  }, [form, profile]);

  const onSubmit = (values: ArticleSchemaType) => {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  if (isLoadingCategories) return <ArticleFormSkeleton />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. Tedex Pharmacy"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <UploadImage
                  uploadMutation={uploadMutation}
                  deleteMutation={deleteMutation}
                  onImageChange={(url) => field.onChange(url)}
                  defaultImageUrl={field.value}
                  maxSize={5}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="ex. Tedex" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category?.id} value={category?.id}>
                      {category?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
