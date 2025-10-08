import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-lovat-eight.vercel.app/api",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth?.accessToken;

    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
