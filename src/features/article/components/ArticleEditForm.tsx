/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Editor } from "@/components/blocks/editor-md/editor";
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
import { SerializedEditorState } from "lexical";
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import { useGetArticleByIdQuery } from "../article.api";
import type { BodyType } from "../article.schema";
import { ArticleSchema, ArticleSchemaType } from "../article.schema";
import { ArticleFormSkeleton } from "./ArticleFormSkeleton";

/** initial fallback editor state (use your existing initialValue) */
const initialValue: BodyType = {
  root: {
    children: [
      {
        children: [],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export const ArticleEditForm = ({ id }: { id: string }) => {
  const { profile } = useAuth();
  const { data } = useGetArticleByIdQuery(id);
  const article = data?.data;
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery({ page: 1, limit: 50 });
  const uploadMutation = useUploadSingleImageMutation();
  const deleteMutation = useDeleteImageByUrlMutation();

  const categories = categoriesData?.data?.data;

  // Cast resolver so RHF generics line up with ArticleSchemaType
  const resolver = zodResolver(ArticleSchema) as unknown as Resolver<
    ArticleSchemaType,
    any
  >;

  const form = useForm<ArticleSchemaType>({
    resolver,
    defaultValues: {
      title: "",
      categoryId: "",
      companyName: "",
      coverImage: "",
      userId: "",
      body: initialValue, // start with initialValue
    },
  });

  // helper: parse article.body whether it's stored as object or JSON string
  function parseBody(raw: any): BodyType {
    if (!raw) return initialValue;
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        return parsed as BodyType;
      } catch (e) {
        console.warn(
          "Failed to parse article.body JSON, falling back to initialValue",
          e
        );
        return initialValue;
      }
    }
    // assume it's already the serialized object
    return raw as BodyType;
  }

  console.log(parseBody(article?.body));

  useEffect(() => {
    if (!profile || !article) return;

    form.reset({
      title: article?.title || "",
      categoryId: article?.categoryId || "",
      companyName: article?.companyName || "",
      coverImage: article?.coverImage || "",
      userId: profile?.id || "",
      body: parseBody(article?.body) || "",
    });
  }, [form, profile, article]);

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
        {/* title, coverImage, companyName fields (unchanged) */}
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

        {/* BODY field: we pass the parsed object into editorSerializedState and update the form on change */}
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Editor
                  editorSerializedState={
                    (field.value as BodyType) || initialValue
                  }
                  onSerializedChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* category select */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
                value={String(field.value || "")}
              >
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
