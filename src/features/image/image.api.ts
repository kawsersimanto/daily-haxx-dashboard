import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { Image, MultipleImage } from "./image.interface";

export const imageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleImage: builder.mutation<ApiResponse<Image>, File>({
      query: (file) => {
        return {
          url: "/images/single",
          method: "POST",
          body: file,
        };
      },
      invalidatesTags: ["images"],
    }),

    // Multiple image upload
    uploadMultipleImages: builder.mutation<ApiResponse<MultipleImage>, File[]>({
      query: (files) => {
        return {
          url: "/images/multiple",
          method: "POST",
          body: files,
        };
      },
      invalidatesTags: ["images"],
    }),

    // Delete single image by URL
    deleteImageByUrl: builder.mutation<ApiResponse<void>, string>({
      query: (url) => ({
        url: "/images/delete",
        method: "DELETE",
        body: { url },
      }),
      invalidatesTags: ["images"],
    }),

    // Bulk delete images by URLs
    bulkDeleteImages: builder.mutation<ApiResponse<void>, string[]>({
      query: (urls) => ({
        url: "/images/bulk",
        method: "DELETE",
        body: { urls },
      }),
      invalidatesTags: ["images"],
    }),
  }),
});

export const {
  useUploadSingleImageMutation,
  useUploadMultipleImagesMutation,
  useDeleteImageByUrlMutation,
  useBulkDeleteImagesMutation,
} = imageApi;
