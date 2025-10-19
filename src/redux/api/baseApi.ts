import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth?.accessToken;

    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  tagTypes: [
    "articles",
    "articleCategories",
    "users",
    "images",
    "polls",
    "pollCategories",
  ],
  endpoints: () => ({}),
});
